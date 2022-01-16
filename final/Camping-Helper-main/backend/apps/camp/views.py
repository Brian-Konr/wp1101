from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.decorators import action
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from . import models, serializers, permissions
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiParameter, OpenApiResponse
from django.contrib.auth import get_user_model
from rest_framework.pagination import LimitOffsetPagination
import csv
from django.http import HttpResponse


@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                name="view",
                location=OpenApiParameter.QUERY,
                description="`all`: showing all public camp <br/>"
                            "`join`: showing all join camp <br/>"
                            "`own`: showing all owned camp <br/>"
                            "`superuser`: for superuser to see all camps (include not private camp)"
                            "use `all` when view is empty",
                required=False,
                type=str,
            ),
            OpenApiParameter(
                name="ordering",
                location=OpenApiParameter.QUERY,
                description="Field to use to order the results<br/>"
                            "Option: camp_start_date, camp_end_date<br/>"
                            "Add minus for descending"
            ),
        ],
    ),
    create=extend_schema(
        description="**auto set camp host to request user**<br/>"
                    "其中category營隊類組的值<br/>"
                    "`1`代表文法類<br/>"
                    "`2`代表財經類<br/>"
                    "`3`代表理工類<br/>"
                    "`4`代表醫護類<br/>"
                    "`5`代表其他<br/>",
    ),
    retrieve=extend_schema(
        description="**only camp owner have permission**",
    ),
    update=extend_schema(
        description="**cannot change is_public value in this endpoint**<br/>"
                    "Same in PATCH endpoint",
    ),
)
class CampViewSet(viewsets.ModelViewSet):
    serializer_classes = {
        "set_public": serializers.CampStatusSerializer,
        "create": serializers.CampCreateSerializer,
        "update": serializers.CampCreateSerializer,
    }
    default_serializer_class = serializers.CampSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = {
        "name": ["contains"],
        "camp_start_date": ["gte", "lte", "exact"],
        "camp_end_date": ["gte", "lte", "exact"],
        "category": ["exact"],
    }
    search_fields = [
        "@name",
    ]
    ordering_fields = [
        "camp_start_date",
        "camp_end_date"
    ]
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        if self.action in ['set_public']:
            return models.Camp.objects.all()
        view = self.request.query_params.get("view")
        if view is None:
            return models.Camp.objects.filter(is_public=True)

        assert view in ["all", "own", "join", "superuser"], "Invalid view query type"

        if view == "all":
            return models.Camp.objects.filter(is_public=True)
        elif view == "own":
            return models.Camp.objects.filter(host=self.request.user)
        elif view == "superuser":
            return models.Camp.objects.all()
        elif view == "join":
            return models.Camp.objects.filter(register_user__in=get_user_model().objects.get(id=self.request.user.id).register.all())

    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, self.default_serializer_class)

    def get_permissions(self):
        if self.action in ["list"] and self.request.query_params.get("view") == "superuser":
            permission_classes = [IsAdminUser]
        elif self.action in ["list", "retrieve", "check_name"]:
            permission_classes = [AllowAny]
        elif self.action in ['create']:
            permission_classes = [IsAuthenticated, permissions.IsHostUser]
        elif self.action in ['delete', 'update', 'set_public', "download"]:
            permission_classes = [IsAuthenticated, permissions.IsOwner]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)

    @extend_schema(
        description="將Camp設定為Public"
    )
    @action(
        detail=True,
        methods=['put'],
        permission_classes=[permissions.IsOwner],
        url_path="public",
        url_name="camp-setpublic",
    )
    def set_public(self, request, pk=None):
        camp = self.get_object()
        if camp.is_public:
            raise ValidationError("活動已經公開")
        camp.is_public = True
        serializer = self.get_serializer(camp, data=dict())
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        description="檢查是否已經有重複名字營隊",
        parameters=[
            OpenApiParameter(
                name="name",
                location=OpenApiParameter.QUERY,
                description="name to check whether it exists",
                required=True,
                type=str,
            ),
        ],
        responses={
            200: OpenApiResponse(description="Available Name"),
            204: OpenApiResponse(description="Not Available Name"),
            400: OpenApiResponse(description="Bad Request"),
        }
    )
    @action(
        detail=False,
        methods=["get"],
        permission_classes=[AllowAny],
        url_path="check-name",
        url_name="camp-checkname"
    )
    def check_name(self, request):
        name = self.request.query_params.get("name")
        if name is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if models.Camp.objects.filter(name=name).exists():
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_200_OK)

    @extend_schema(
        description= "Permission: "
                     "只有此活動的創辦人可以使用此endpoint <br/><br/>"
                     "下載所有報名資料<br/>"
                     "若此camp中的question形式錯誤會導致500無法獲得CSV檔<br/>",
        responses={
            "200": OpenApiResponse(description="Return with text/csv attachment"),
            "500": OpenApiResponse(description="May occurs by invalid questions in Camp model<br/>"
                                               "Valid Questions field example: [1,2,3,4]")
        }
    )
    @action(
        detail=True,
        methods=["get"],
        url_path="download",
        url_name="download",
    )
    def download(self, request, *args, **kwargs):
        instance = self.get_object()
        response = HttpResponse(content_type="text/csv")
        response['Content-Disposition'] = 'attachment; filename="{instance.name}_報名資料.csv"'

        questions = instance.questions

        field_names = [models.Camp.CustomMeta.question_dict[question]["verbose_name"] for question in questions]

        writer = csv.DictWriter(response, fieldnames=field_names)

        writer.writeheader()

        for register in instance.register_user.all():
            row_dict = dict()
            for question in questions:
                field_name = models.Camp.CustomMeta.question_dict[question]["field"]
                row_dict[models.Camp.CustomMeta.question_dict[question]["verbose_name"]] = getattr(register, field_name)

            writer.writerow(row_dict)

        return response




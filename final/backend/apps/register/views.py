from . import serializers, models, permissions
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_nested.viewsets import NestedViewSetMixin
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiResponse


@extend_schema_view(
    create=extend_schema(
        description="Only user who hasn't join this camp could use this endpoint",
        responses={
          201: OpenApiResponse(
            response=serializers.RegisterSerializer,
          ),
          403: OpenApiResponse(
              description="already register in this camp",
          ),
        }
    ),
    list=extend_schema(
        description="Only admin could use",
    ),
    update=extend_schema(
        description="only the user could use",
    ),
    retrieve=extend_schema(
        description="camp host or the user could use",
    ),
)
class RegisterViewSet(
    viewsets.ModelViewSet,
    NestedViewSetMixin,
):
    serializer_class = serializers.RegisterSerializer

    def get_queryset(self):
        return models.Registration.objects.filter(camp=self.kwargs["camp_pk"])

    def get_permissions(self):
        if self.action in ["list"]:
            permission_classes = [(IsAuthenticated & permissions.IsCampOwner)]
        elif self.action in ["retrieve"]:
            permission_classes = [(IsAuthenticated & (permissions.IsCampOwner | permissions.IsRegistrationOwner))]
        elif self.action in ["update", "delete"]:
            permission_classes = [(IsAuthenticated & permissions.IsRegistrationOwner)]
        elif self.action in ["create"]:
            permission_classes = [(IsAuthenticated & permissions.CanRegister)]
        elif self.action in ["user_owned_registration"]:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(
            camp=models.Registration._meta.get_field('camp').remote_field.model.objects.get(id=self.kwargs['camp_pk']),
            user=self.request.user,
        )

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)

        camp = models.Registration._meta.get_field("camp").remote_field.model.objects.get(id=self.kwargs["camp_pk"])
        question_dict = models.Registration._meta.get_field("camp").remote_field.model.CustomMeta.question_dict
        questions = camp.questions

        fields = [question_dict[question]["field"] for question in questions]
        fields += ["id", "url", "camp", "user"]

        if page is not None:
            serializer = self.get_serializer(page, many=True, fields=fields)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, fields=fields)
        return Response(serializer.data)

    @extend_schema(
        description="Get My Registration in the camp",
        responses={
            200: OpenApiResponse(serializers.RegisterSerializer, description="用戶有在該活動中"),
            403: OpenApiResponse(description="用戶沒有驗證 "),
            404: OpenApiResponse(serializers.RegisterSerializer.errors, description="用戶不在該活動中或是該活動根本不存在"),
        },
    )
    @action(
        detail=False,
        methods=["get"],
        url_path="me",
        url_name="registration-me",
    )
    def user_owned_registration(self, request, **kwargs):
        instance = get_object_or_404(models.Registration, user=self.request.user, camp=kwargs["camp_pk"])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)




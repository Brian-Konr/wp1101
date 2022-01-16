from django.urls import include, path
from rest_framework_nested.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"camp", views.CampViewSet, basename="camp")

urlpatterns = [
    path('', include(router.urls)),
]
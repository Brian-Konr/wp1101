from django.urls import include, path
from rest_framework_nested.routers import NestedDefaultRouter
from . import views
from .. camp.urls import router as camprouter

register_router = NestedDefaultRouter(camprouter, r'camp', lookup="camp")
register_router.register(r'registration', views.RegisterViewSet, basename="registration")

urlpatterns = [
    path('', include(register_router.urls)),
]
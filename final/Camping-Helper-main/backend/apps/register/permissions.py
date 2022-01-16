from rest_framework.permissions import  BasePermission
from . import models


class IsCampOwner(BasePermission):
    def has_permission(self, request, view):
        camp = models.Registration._meta.get_field("camp").remote_field.model.objects.get(id=view.kwargs["camp_pk"])
        return request.user == camp.host


class IsRegistrationOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user


class CanRegister(BasePermission):
    def has_permission(self, request, view):
        camp = models.Registration._meta.get_field("camp").remote_field.model.objects.get(id=view.kwargs["camp_pk"])
        return not models.Registration.objects.filter(camp=camp).filter(user=request.user).exists()




from rest_framework.permissions import BasePermission


class IsHostUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_host


class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.host == request.user

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import MyUserChangeForm, MyUserCreationForm
from .models import User


# from member.models import VerifiedUser
# Register your models here.
class MyUserAdmin(UserAdmin):
    add_form = MyUserCreationForm
    form = MyUserChangeForm
    model = User
    list_display = ('email', 'is_staff', 'is_active')
    list_filter = ('email', 'is_staff', 'is_active')
    fieldsets = ((None, {'fields': ('email', 'password', 'name')}),
                 ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None,
         {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active', "birthday", "username", "if_agree", "name"),
         }
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


admin.site.register(User, MyUserAdmin)

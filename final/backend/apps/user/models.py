from django.db import models
from django.utils import timezone
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager


class MyUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', False)
        extra_fields.setdefault('is_host', True)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_host', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        if extra_fields.get('is_host') is not True:
            raise ValueError('Superuser must have is_host=True.')
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):

    # email to identify user
    email = models.EmailField('email address', unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    # whether is superuser to reach admin page
    is_superuser = models.BooleanField(default=False)
    # whether the user can hold activity
    is_host = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    name = models.CharField(
        help_text="名字",
        max_length=50
    )
    last_name = models.CharField(
        help_text="姓氏",
        max_length=50,
        blank=True,
    )
    birthday = models.DateField()
    username = models.CharField(help_text="用戶名稱", max_length=50)
    if_agree = models.BooleanField(default=False, help_text="是否同意服務條款和資料政策")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
        'name',  'birthday', 'username', 'if_agree',
    ]

    objects = MyUserManager()

    class Meta:
        db_table = "user"

    def __str__(self):
        return self.email


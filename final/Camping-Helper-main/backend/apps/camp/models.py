from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
from .. storage_backends import PublicMediaStorage, PrivateMediaStorage
from . import utils

def camp_file_path(instance, filename):
    return f'camp_{instance.name}/{filename}'


def questions_default():
    return {"questions": ""}


class Camp(models.Model):

    class ClassCategory(models.IntegerChoices):
        FIRST = 1, "文法類"
        SECOND = 2, "財經類"
        THIRD = 3, "理工類"
        FOURTH = 4, "醫護類"
        OTHER = 5, "其他"

    name = models.CharField(
        max_length=150,
        unique=True,
        help_text="活動名稱",
        null=False,
        db_index=True,
    )
    information = models.CharField(
        max_length=2000,
        help_text="活動資訊",
        default="",
    )
    cover_photo = models.FileField(
        upload_to=camp_file_path,
        help_text="活動圖片",
        storage=PublicMediaStorage(),
        blank=True,
    )
    is_public = models.BooleanField(
        default=True,
        help_text="是否公開",
        db_index=True,
    )
    camp_start_date = models.DateField(
        blank=True,
        null=True,
        help_text="活動開始日期",
        db_index=True,
    )
    camp_end_date = models.DateField(
        blank=True,
        null=True,
        help_text="活動結束時間",
        db_index=True,
    )
    register_start_date = models.DateTimeField(
        blank=False,
        help_text="報名開始時間",
    )
    register_end_date = models.DateTimeField(
        blank=False,
        help_text="報名結束時間",
    )
    host = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="host_activity",
        help_text="營隊創辦人",
    )
    place = models.CharField(
        max_length=100,
        null=False,
        help_text="活動地點",
        default="",
    )
    link = models.URLField(
        blank=True,
        help_text="相關連結",
    )
    fee = models.PositiveIntegerField(
        default=0,
        help_text="活動費用",
    )
    quota = models.PositiveIntegerField(
        default=100,
        help_text="活動名額",
    )
    precaution = models.CharField(
        help_text="注意事項",
        max_length=2000,
        null=True,
    )
    questions = models.JSONField(
        "list of question",
        default=questions_default,
        help_text="營隊選擇問題",
    )
    short_description = models.CharField(
        max_length=200,
        default="",
        blank=True,
        help_text="營隊簡短介紹",
    )
    category = models.PositiveIntegerField(
        choices=ClassCategory.choices,
        default=ClassCategory.OTHER,
        help_text="營隊類組",
    )

    def __str__(self):
        return self.name

    class Meta:
        db_table = "camp"

    class CustomMeta:
        question_dict = utils.question_dict


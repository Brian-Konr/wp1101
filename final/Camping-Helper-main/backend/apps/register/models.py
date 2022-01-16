from django.db import models
from django.contrib.auth import get_user_model


class Registration(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="register",
        help_text="所屬用戶",
    )
    camp = models.ForeignKey(
        "camp.Camp",
        on_delete=models.CASCADE,
        related_name="register_user",
        help_text="所屬營隊",
    )
    name = models.CharField(
        max_length=50,
        default="",
        help_text="姓名",
        blank=True,
    )
    sex = models.CharField(
        max_length=50,
        default="",
        help_text="生理性別",
        blank=True,
    )
    nationality = models.CharField(
        max_length=100,
        default="",
        blank=True,
        help_text="國籍",
    )
    id_number = models.CharField(
        max_length=10,
        default="",
        blank=True,
        help_text="身分證字號",
    )
    birth_date = models.DateField(
        null=True,
        help_text="出生年月日",
    )
    school_grade = models.CharField(
        verbose_name="School_and_grade",
        max_length=200,
        blank=True,
        default="",
        help_text="學校名稱和年級",
    )
    special_disease = models.CharField(
        max_length=500,
        blank=True,
        default="",
        help_text="特殊疾病",
    )
    fb_link = models.URLField(
        verbose_name="Facebook Link",
        null=True,
        blank=True,
        help_text="臉書連結",
    )
    eating_habit = models.CharField(
        max_length=200,
        default="",
        blank=True,
        help_text="飲食習慣",
    )
    email = models.EmailField(
        null=True,
        blank=True,
        help_text="E-mail",
    )
    contact_number = models.CharField(
        max_length=20,
        blank=True,
        default="",
        help_text="聯絡電話",
    )
    guardian_name = models.CharField(
        max_length=100,
        default="",
        blank=True,
        help_text="監護人 姓名",
    )
    guardian_relationship = models.CharField(
        max_length=50,
        default="",
        blank=True,
        help_text="與監護人之關係",
    )
    guardian_contact_number = models.CharField(
        max_length=20,
        default="",
        blank=True,
        help_text="監護人聯絡電話",
    )
    introduction = models.TextField(
        max_length=3000,
        default="",
        blank=True,
        help_text="自我介紹",
    )
    special_experience = models.TextField(
        max_length=3000,
        default="",
        blank=True,
        help_text="特殊經歷",
    )
    motivation = models.TextField(
        max_length=3000,
        default="",
        blank=True,
        help_text="報名動機",
    )
    camp_anticipation = models.TextField(
        max_length=3000,
        default="",
        blank=True,
        help_text="對營隊的期許",
    )
    other = models.TextField(
        max_length=3000,
        default="",
        blank=True,
        help_text="其他",
    )
    is_finish = models.BooleanField(
        default=True,
        null=False,
        help_text="是否完成報名填寫",
    )

    class Meta:
        db_table = "registration"
        constraints =[
            models.UniqueConstraint(
                fields=["camp", "user"],
                name="unique-camp-for-user",
            ),
        ]

    def __str__(self):
        return f'營隊_{self.camp.name}_用戶_{self.user.name}'

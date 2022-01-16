from django.db import models


# Create your models here.
class Question(models.Model):

    class QuestionType(models.TextChoices):
        TEXT = "t", "Text Question"
        FILE = "f", "File Question"
        S_CHOICE = "s", "Single Choice"
        M_CHOICE = "m", "Multiple Choice"
        OTHER = "o", "Not Yet Implemented"

    name = models.CharField(
        max_length=500,
        unique=True,
        help_text="問題名稱",
    )
    type = models.CharField(
        max_length=1,
        choices=QuestionType.choices,
        default=QuestionType.TEXT,
        help_text="問題類別",
    )

    class Meta:
        db_table = "question"
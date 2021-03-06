# Generated by Django 4.0 on 2022-01-14 13:00

import apps.camp.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camp', '0009_remove_camp_questions'),
    ]

    operations = [
        migrations.AddField(
            model_name='camp',
            name='questions',
            field=models.JSONField(default=apps.camp.models.questions_default, help_text='營隊選擇問題', verbose_name='list of question'),
        ),
    ]

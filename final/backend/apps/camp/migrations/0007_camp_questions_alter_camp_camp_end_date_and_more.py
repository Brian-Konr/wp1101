# Generated by Django 4.0 on 2022-01-11 19:17

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camp', '0006_alter_camp_cover_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='camp',
            name='questions',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.PositiveIntegerField(verbose_name='問題 key'), null=True, size=None),
        ),
        migrations.AlterField(
            model_name='camp',
            name='camp_end_date',
            field=models.DateField(blank=True, db_index=True, help_text='活動結束時間', null=True),
        ),
        migrations.AlterField(
            model_name='camp',
            name='camp_start_date',
            field=models.DateField(blank=True, db_index=True, help_text='活動開始日期', null=True),
        ),
        migrations.AlterField(
            model_name='camp',
            name='is_public',
            field=models.BooleanField(db_index=True, default=False, help_text='是否公開'),
        ),
        migrations.AlterField(
            model_name='camp',
            name='name',
            field=models.CharField(db_index=True, help_text='活動名稱', max_length=150, unique=True),
        ),
    ]

# Generated by Django 4.0 on 2022-01-15 03:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0005_alter_registration_is_finish'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registration',
            name='email',
            field=models.EmailField(blank=True, help_text='E-mail', max_length=254, null=True),
        ),
    ]

# Generated by Django 4.0 on 2022-01-11 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='問題名稱', max_length=500, unique=True)),
                ('type', models.CharField(choices=[('t', 'Text Question'), ('f', 'File Question'), ('s', 'Single Choice'), ('m', 'Multiple Choice'), ('o', 'Not Yet Implemented')], default='t', help_text='問題類別', max_length=1)),
            ],
        ),
    ]

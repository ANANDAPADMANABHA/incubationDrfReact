# Generated by Django 4.1.1 on 2022-10-07 06:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='username',
            field=models.CharField(max_length=255, null=True, unique=True),
        ),
    ]
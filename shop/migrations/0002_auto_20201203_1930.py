# Generated by Django 3.1.4 on 2020-12-03 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='picture',
            name='ordering',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='ordering',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]

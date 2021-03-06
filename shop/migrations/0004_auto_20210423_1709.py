# Generated by Django 3.1.4 on 2021-04-23 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_auto_20201203_2331'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Picture',
        ),
        migrations.AlterField(
            model_name='product',
            name='ordering',
            field=models.IntegerField(blank=True, default=1000, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='product',
            name='product_category',
            field=models.CharField(blank=True, choices=[('GENERAL', 'GENERAL'), ('PHONES', 'PHONES'), ('PCs', 'PCs')], max_length=100, null=True),
        ),
    ]

from django.db import models


PRODUCT_CATEGORY_CHOICES = [
    ('GENERAL', 'GENERAL'),
    ('PHONES', 'PHONES'),
    ('PCs', 'PCs'),
]


class Product(models.Model):
    product_name = models.CharField(max_length=100)
    price = models.IntegerField()
    product_category = models.CharField(max_length=100,
                                        choices=PRODUCT_CATEGORY_CHOICES,
                                        null=True,
                                        blank=True)
    main_page = models.BooleanField(default=False)
    ordering = models.IntegerField(null=True, blank=True)
    description = models.CharField(max_length=500, null=True, blank=True)
    product_image = models.ImageField(upload_to='products/', max_length=500)

    def __str__(self):
        return self.product_name


class Picture(models.Model):
    picture_name = models.CharField(max_length=100)
    display = models.BooleanField(default=False)
    ordering = models.IntegerField(null=True, blank=True)
    picture_image = models.ImageField(upload_to='pictures/', max_length=500)

    def __str__(self):
        return self.picture_name

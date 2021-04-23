from django.db import models


PRODUCT_CATEGORY_CHOICES = [
    ('GENERAL', 'GENERAL'),
    ('PHONES', 'PHONES'),
    ('PCs', 'PCs'),
]


class Product(models.Model):
    product_name = models.CharField(max_length=200)
    price = models.IntegerField()
    old_price = models.IntegerField(null=True, blank=True)
    product_category = models.CharField(max_length=200,
                                        choices=PRODUCT_CATEGORY_CHOICES,
                                        null=True,
                                        blank=True)
    main_page = models.BooleanField(default=False)
    ordering = models.IntegerField(null=True, blank=True, default=1000)
    product_image = models.ImageField(upload_to='products/', max_length=500)
    description = models.TextField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return self.product_name

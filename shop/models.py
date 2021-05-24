from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=200)

    class Meta:
        ordering = ('-id', )
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        ordering = ('-id', )

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    old_price = models.IntegerField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, null=True, blank=True)
    featured = models.BooleanField(default=False)
    image = models.ImageField(upload_to='products/', max_length=500)
    description = models.TextField(max_length=1000, null=True, blank=True)

    class Meta:
        ordering = ('-id', )

    def __str__(self):
        return self.name

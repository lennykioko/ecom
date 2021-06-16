from django.contrib import admin

from .models import Category, Brand, Product


class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('category', )
    list_editable = ('category', )
    search_fields = ('name', 'category')


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'featured', 'category', 'brand')
    list_filter = ('featured', 'category', 'brand')
    list_editable = ('price', 'featured', 'category', 'brand')
    search_fields = ('name', 'price', 'description')


admin.site.register(Category)
admin.site.register(Brand, BrandAdmin)
admin.site.register(Product, ProductAdmin)

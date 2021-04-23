from django.contrib import admin

from .models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'price', 'main_page', 'ordering', 'product_category')
    list_filter = ('main_page', 'product_category')
    list_editable = ('price', 'main_page', 'product_category', 'ordering')
    search_fields = ('product_name', 'price', 'description')


admin.site.register(Product, ProductAdmin)

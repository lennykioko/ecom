from django.contrib import admin

from .models import Product, Picture


class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'price', 'main_page', 'ordering', 'product_category')
    list_filter = ('main_page', 'product_category')
    list_editable = ('price', 'main_page', 'product_category', 'ordering')
    search_fields = ('product_name', 'price', 'description')


class PictureAdmin(admin.ModelAdmin):
    list_display = ('picture_name', 'display', 'ordering')
    list_filter = ('display',)
    list_editable = ('display', 'ordering')
    search_fields = ('picture_name',)


admin.site.register(Product, ProductAdmin)
admin.site.register(Picture, PictureAdmin)

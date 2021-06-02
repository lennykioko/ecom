from django.urls import path

from . import views

app_name = 'shop'

urlpatterns = [
    path('', views.IndexView.as_view(), name='home'),
    path('about/', views.AboutView.as_view(), name='about'),
    path('contact/', views.ContactView.as_view(), name='contact'),
    path('catalogue/', views.ShopView.as_view(), name='catalogue'),

    path('categories/', views.CategoryView.as_view(), name='category'),
    path('categorybrands/', views.CategoryBrandView.as_view(), name='categorybrand'),
    path('brands/', views.BrandView.as_view(), name='brand'),
    path('products/', views.ProductView.as_view(), name='product')

]

from django.urls import path

from . import views

app_name = 'shop'

urlpatterns = [
    path('', views.IndexView.as_view(), name='home'),
    path('ajax/', views.AjaxSearchView.as_view(), name='ajax'),
    path('about/', views.AboutView.as_view(), name='about'),
    path('contact/', views.ContactView.as_view(), name='contact'),
    path('shop/', views.ShopView.as_view(), name='shop')
]

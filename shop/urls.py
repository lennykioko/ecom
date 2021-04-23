from django.urls import path

from . import views

app_name = 'shop'

urlpatterns = [
    path('', views.IndexView.as_view(), name='home'),
    path('ajax/', views.AjaxSearchView.as_view(), name='ajax')
]

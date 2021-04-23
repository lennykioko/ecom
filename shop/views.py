from django.views import generic
from django.views.generic import View, TemplateView
from django.http import JsonResponse
from django.db.models import Q

from .models import Product


class IndexView(TemplateView):
    template_name = 'shop/index.html'


class AjaxSearchView(View):
    def get(self, request):
        data = Product.objects.filter(
            main_page=True).order_by('ordering')[:20].values()

        category = request.GET.get("category")
        search = request.GET.get("search")

        if search and not category:
            data = Product.objects.filter(
                Q(product_name__icontains=search)
                | Q(price__icontains=search)
                | Q(product_category__icontains=search)
                | Q(description__icontains=search)).values()

        if search and category:
            data = Product.objects.filter(
                Q(product_name__icontains=search)
                | Q(price__icontains=search)
                | Q(description__icontains=search)).filter(
                    Q(product_category__icontains=category)).values()

        if category and not search:
            data = Product.objects.filter(
                Q(product_category__icontains=category)).values()

        return JsonResponse({"data": list(data)}, status=200)

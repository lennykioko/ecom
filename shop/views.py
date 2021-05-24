from django.views.generic import View, TemplateView
from django.http import JsonResponse
from django.db.models import Q

from .models import Category, Brand, Product


class IndexView(TemplateView):
    template_name = 'shop/index.html'


class AboutView(TemplateView):
    template_name = 'shop/about-us.html'


class ContactView(TemplateView):
    template_name = 'shop/contact-us.html'


class ShopView(TemplateView):
    template_name = 'shop/shop.html'


# API CALLS


class CategoryView(View):
    def get(self, request):
        data = Category.objects.all().values()
        return JsonResponse({"categories": list(data)}, status=200)


class BrandView(View):
    def get(self, request):
        data = Brand.objects.all().values()

        category = request.GET.get("category")

        if category:
            data = Brand.objects.filter(category__name__contains=category).values()

        return JsonResponse({"brands": list(data)}, status=200)


class ProductView(View):
    def get(self, request):
        category = request.GET.get("category")
        brand = request.GET.get("brand")

        featured = request.GET.get("featured")
        search = request.GET.get("search")
        limit = request.GET.get("limit")

        data = Product.objects.filter(featured=True).values()

        if search:
            data = Product.objects.filter(
                Q(name__icontains=search)
                | Q(price__icontains=search)  # noqa: W503
                | Q(category__name__icontains=search)  # noqa: W503
                | Q(brand__name__icontains=search)  # noqa: W503
                | Q(description__icontains=search)).values()  # noqa: W503

        if limit:
            try:
                limit = int(limit)
            except ValueError:
                limit = 20
                print("Error: Ensure limit is a valid number")

            data = Product.objects.all()[:limit].values()

        if featured and limit:
            try:
                limit = int(limit)
            except ValueError:
                limit = 20
                print("Error: Ensure limit is a valid number")
                
            data = Product.objects.filter(featured=True)[:limit].values()

        if category and brand:
            data = Brand.objects.filter(
                Q(category__name__icontains=category)  # noqa: W503
                | Q(brand__name__icontains=brand)  # noqa: W503
            )

        return JsonResponse({"products": list(data)}, status=200)

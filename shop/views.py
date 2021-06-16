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


class CategoryBrandView(View):
    def get(self, request):
        data = []
        categories = Category.objects.all()
        for category in categories:
            data.append({category.name: list(category.brand_set.all().values())})

        return JsonResponse({"categorybrands": list(data)}, status=200)


class BrandView(View):
    def get(self, request):
        data = Brand.objects.all().values()

        category = request.GET.get("category")

        if category:
            data = Brand.objects.filter(category__name__contains=category).values()

        return JsonResponse({"brands": list(data)}, status=200)


class ProductView(View):
    def get(self, request):
        search = request.GET.get("search")
        featured = request.GET.get("featured")
        category = request.GET.get("category")
        brands = request.GET.get("brands")

        order = request.GET.get("order")

        limit = request.GET.get("limit")

        data = Product.objects.all()

        if search:
            data = data.filter(
                Q(name__icontains=search)
                | Q(price__icontains=search)  # noqa: W503
                | Q(category__name__icontains=search)  # noqa: W503
                | Q(brand__name__icontains=search)  # noqa: W503
                | Q(description__icontains=search))  # noqa: W503

        if featured:
            data = data.filter(featured=True)

        if category:
            data = data.filter(Q(category__name__icontains=category))

        if brands:
            brands = brands.split(',')
            data = data.filter(brand__name__in=brands)

        if order:
            if order.upper() == 'NEWEST':
                data = data.order_by('-id')

            if order.upper() == 'OLDEST':
                data = data.order_by('id')

            elif order.upper() == 'FEATURED':
                data = data.filter(featured=True).order_by('-id')

            elif order.upper() == 'DESC':
                data = data.order_by('-price')

            elif order.upper() == 'ASC':
                data = data.order_by('price')

            else:
                data = data.order_by('-id')

        if limit:
            try:
                limit = int(limit)
            except ValueError:
                limit = 20
                print("Error: Ensure limit is a valid number")

            data = data[:limit]

        return JsonResponse({"products": list(data.values())}, status=200)

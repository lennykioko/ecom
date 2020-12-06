from django.views import generic
from django.views.generic import View
from django.http import JsonResponse
from django.db.models import Q

from .models import Product, Picture


class IndexView(generic.ListView):
    template_name = 'shop/index.html'
    context_object_name = 'query_dict'

    def get_queryset(self):
        """Returns 5 pictures and 20 products."""
        query = {
            "products": Product.objects.filter(main_page=True).order_by('ordering')[:20],  # noqa E501
            "pictures": Picture.objects.filter(display=True).order_by('ordering')[:5]  # noqa E501
        }
        return query


class AjaxHandlerView(View):
    def get(self, request):
        data = Product.objects.filter(main_page=True).order_by('ordering')[:20].values()  # noqa E501

        if request.is_ajax():
            category = request.GET.get("category")
            search = request.GET.get("search")

            if search and category == "All":
                data = Product.objects.filter(
                    Q(product_name__icontains=search)
                    | Q(price__icontains=search)
                    | Q(description__icontains=search)).values()

            if search and category != "All":
                data = Product.objects.filter(
                    Q(product_name__icontains=search)
                    | Q(price__icontains=search)
                    | Q(description__icontains=search)).filter(
                    Q(product_category__icontains=category)).values()

            if category != "All" and not search:
                data = Product.objects.filter(Q(product_category__icontains=category)).values()  # noqa E501

            return JsonResponse({"data": list(data)}, status=200)

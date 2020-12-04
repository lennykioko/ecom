from django.shortcuts import render
from django.views import generic

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
        print(query)
        return query

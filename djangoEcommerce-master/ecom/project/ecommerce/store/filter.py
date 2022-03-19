import django_filters
from .models import Product, Category

class ProductFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='iexact')
    product_code = django_filters.CharFilter(lookup_expr='iexact')
    class Meta:
        model = Product
        fields = ['special', 'category', 'name', 'product_code']


class CategoryFilter(django_filters.FilterSet):
    class Meta:
        model = Category
        fields = ['c_name']        
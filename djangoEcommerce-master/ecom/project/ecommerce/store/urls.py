"""ecommerce URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [

    # (authentication_urls)
    path('login/', views.login_view, name='login'),
    path('register/', views.register, name='register'),
    path('logout/', views.logout_view, name='logout'),

    
    # (frontend_urls)

    # home page url.
    path('', views.store, name='store'),

    # about page url.
    path('about/', views.about, name='about'),

    # custom-order page url.
    path('custom-order/', views.custom_order, name='ustom-order-contact'),

    # contact page url.
    path('contact/', views.contact, name='contact'),


    # individual product page url.
    path('<int:pk>/detail', views.detail, name='item_detail'),

    # cart page url.
    path('cart/', views.cart, name='cart'),

    # checkout page url.
    path('checkout/', views.checkout, name='checkout'),

    # cart-item[add, delete, update, availability ] url.
    path('updateItem/', views.updateItem, name='update_item'),

    # search page url.
    path('search_product/', views.searchItem, name='search_item'),

    # final order submit page url.
    path('checkout_form/', views.checkoutForm, name='checkout_form'),

    # sort product based on price desc url.
    path('sort_price_highest/', views.sortPriceHighest, name='sortPriceHighest'),

    # sort product based on price asc url.
    path('sort_price_lowest/', views.sortPriceLowest, name='sortPriceLowest'),

    # sort product based on latest  url.
    path('sort_product_latest/', views.sortProductLatest, name='sortProductLatest'),

    # sort product based on category.
    path('<int:pk>/category/', views.sortCategory, name='sortCategory'),

    #bulk customization.
    path('<int:pk>/bulk_product_customize', views.customizeBulkProduct, name='bulk_product_customize'),

    #payment integration.
    path('payment', views.payment, name='payment'),

    #coupon code.
    path('<int:pk>/coupon_code', views.couponCode, name='coupon_code'),

    #coupon code submission.
    path('coupon_code_submission', views.couponSubmission, name='coupon_code_submission'),

    #payment confirmation.
    path('<int:pk>/payment_confirmation', views.paymentConfirmation, name='paymentConfirmation'),








    # (backend_urls)
    path('dashboard/', views.dashboard, name='dashboard'),
    path('site_customization/', views.sitecustom, name='site-custom'),
    path('<int:pk>/password_change', views.password_change, name='password_change'),
    path('products/', views.products, name='products'),
    path('add_category', views.add_category, name='add_category'),
    path('<int:pk>/delete_category', views.delete_category, name='delete_category'),
    path('add_product/', views.add_product, name='add_product'),
    path('<int:pk>/delete_product', views.delete_product, name='delete_product'),
    path('<int:pk>/edit_product', views.edit_product, name='edit_product'),
    path('<int:pk>/update_profile', views.update_profile, name='update_profile'),
    path('contact_manager', views.contactManager, name='contact_manager'),
    path('email', views.emailManager, name='email_manager'),
    path('custom-order', views.customOrder, name='custom-order'),
    path('<int:pk>/custom_order_view', views.customOrderView, name='custom_order_view'),
    path('<int:pk>/custom_order_email', views.customOrderEmail, name='custom_order_email'),
    path('<int:pk>/custom_order_delete', views.customOrderDelete, name='custom_order_delete'),
    path('delivery_list', views.deliveryList, name='deliveryList'),
    path('<int:pk>/change_delivery_status', views.changeStatus, name='change_delivery_status'),
    path('<int:pk>/change_delivery_status_update', views.updateStatus, name='change_delivery_status_update'),

    # order history of individual customer url.
    path('order_list', views.orderList, name='order_list'),

    #customer message to manager.
    path('customer_msg', views.customerMsgList, name='customer_msg'),

    #slider list.
    path('banner', views.sliderList, name='slider_list'),

    #slider update.
    path('<int:pk>/banner', views.sliderUpdate, name='slider_update'),

    #report generator view.
    path('report', views.Report, name='report'),

    #generate report.
    path('report_generate', views.generate_pdf_report, name='report_generate'),
 

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

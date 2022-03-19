from django.template.loader import render_to_string
#fetch enviornment variable. 
from django.conf import settings
from django.core.mail import EmailMessage


from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from .models import *

from .form import (LoginForm, ProductForm, RegisterForm, ProfileUpdateForm, 
                   UserUpdateForm, CategoryForm, SiteUpdateForm, CustomOrderForm, 
                   ContactManagerForm, SliderForm)

from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .decorators import page_access
from .filter import *
import json

#render html page to pdf.
from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
import xhtml2pdf.pisa as pisa
from django.core.files import File


""" List of frontend controller """


#site landing page.
def store(request):
    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
    else:
        order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}

    products = Product.objects.filter(special=False)
    site = SiteInfo.objects.all()[:1].get()
    slider = Slider.objects.get(id=1)
    specials = Product.objects.filter(special=True)
    category = Category.objects.all()
    context = {'products': products, 'order': order,
               'specials': specials, 'category': category, 'site': site, 'slider': slider}
    return render(request, 'store/frontend/store.html', context)


#about page.
def about(request):
    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
    else:
        order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}

    products = Product.objects.all()
    site = SiteInfo.objects.all()[:1].get()
    context = {'products': products, 'order': order, 'site': site}
    return render(request, 'store/frontend/about.html', context)


#custom design page.
def custom_order(request):
    if request.method == "POST":
        Customorder_form = CustomOrderForm(request.POST)
        if Customorder_form.is_valid():
            result = Customorder_form.save(commit=False)
            result.user = request.user
            result.save()
            return redirect('store')

    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
        form = CustomOrderForm()
    else:
        form = {}
        order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}

    products = Product.objects.all()
    site = SiteInfo.objects.all()[:1].get()
    context = {'products': products,
               'order': order, 'site': site, 'form': form}
    return render(request, 'store/frontend/contact.html', context)



#site contact page.
def contact(request):
    if request.method == "POST":
        contact_form = ContactManagerForm(request.POST)
        if contact_form.is_valid():
            result = contact_form.save(commit=False)
            result.user = request.user
            result.save()
            return redirect('contact')

    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
        form = ContactManagerForm()    

    else:
        form = {}
        order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}   

    # getting manager group user.
    manager_group = Group.objects.get(name="manager")
    managers = manager_group.user_set.all()

    # getting store group user.
    store_group = Group.objects.get(name="store assistant")
    stores = store_group.user_set.all()

    products = Product.objects.all()
    site = SiteInfo.objects.all()[:1].get()
    context = {'products': products, 'order': order, 'site': site,
                'managers': managers, 'stores': stores, 'form': form}

    return render(request, 'store/frontend/contactemail.html', context)





#product detail page.
def detail(request, pk):
    product = Product.objects.get(id=pk)
    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
    else:
        order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}

    site = SiteInfo.objects.all()[:1].get()
    context = {'product': product, 'order': order, 'site': site}
    return render(request, 'store/frontend/detail.html', context)



#bulk request page, generate token and special discount, email user along with the token.
def customizeBulkProduct(request, pk):
    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)

        if request.method == "POST":
            stock = request.POST.get('qty')
            product = Product.objects.get(id=pk)
            
            #generate token.
            product_name = product.name[:2]
            token = (request.user.username[:2] + product_name.upper() + str(stock)).upper()

            form = Token(stock=stock, product=product, user=request.user, code=token, order=order)
            form.save()

            #sending email
            template = render_to_string('store/frontend/tokenmsg.html', {
                                        'user': request.user, 'token': token})
            email = EmailMessage(

                'Amart Furniture',
                template,
                settings.EMAIL_HOST_USER,
                [request.user.email],
            )
            email.fail_silently = False
            email.send()

            messages.success(request, 'Thank You, We will email you soon!!')
               
        
    else:
        form = {}
        order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}

    product = Product.objects.get(id=pk)
    site = SiteInfo.objects.all()[:1].get()
    context = {'product':product, 'order':order, 'site':site}
    return render(request, 'store/frontend/bulkcustomization.html', context)    



#coupon code form.
def couponCode(request, pk):
    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
        items = order.orderitem_set.all()
        
    else:
        return redirect('store')

    site = SiteInfo.objects.all()[:1].get()
    context = {'items': items, 'order': order, 'site': site, 'pk':pk}
    return render(request, 'store/frontend/bulkcart.html', context)



#validate submitted coupon and store.
def couponSubmission(request):
    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
           

        if request.method == "POST":
            code = request.POST.get('token')

            p_id = request.POST.get('product')
            product = Product.objects.get(id=p_id)

            try:
                check = Token.objects.get(code=code)
        
                if check.valid == True:
                    qty = check.stock
                    items = order.orderitem_set.all()

                    for i in items:
                        if i.product == product:
                            i.quantity += qty - 1
                            i.code = True
                            i.save()

                return redirect('cart') 

            except Token.DoesNotExist:
                return redirect('store')


    




""" get called when 'add to cart' event is initiated, get product id 
and action type from button attributes and update the quantity of individual product. """


def updateItem(request):
    data = json.loads(request.body)
    productId = data['productId']
    productAction = data['productAction']
    product = Product.objects.get(id=productId)
    order, created = Order.objects.get_or_create(
        user=request.user, complete=False)
    orderItem, created = OrderItem.objects.get_or_create(
        order=order, product=product, user=request.user)

    if productAction == 'add':
        orderItem.quantity += 1

    elif productAction == 'remove':
        orderItem.quantity -= 1

    elif productAction == 'delete':
        orderItem.delete()
        return JsonResponse('item added', safe=False)

    orderItem.save()

    if orderItem.quantity < 1:
        orderItem.delete()

    return JsonResponse('item added', safe=False)




#cart details.
def cart(request):
    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
        items = order.orderitem_set.all()
    else:
        items = []
        order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}
    site = SiteInfo.objects.all()[:1].get()
    context = {'items': items, 'order': order, 'site': site}
    return render(request, 'store/frontend/cart.html', context)




#checkout page.
def checkout(request):
    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
        items = order.orderitem_set.all()
    else:
        items = []
        order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}

    site = SiteInfo.objects.all()[:1].get()
    context = {'items': items, 'order': order, 'site': site}
    return render(request, 'store/frontend/checkout.html', context)




#add user address and redirect to payment process.
def checkoutForm(request):
    if request.user.is_authenticated:
        address = request.POST.get('address')
        city = request.POST.get('city')
        order = Order.objects.get(user=request.user, complete=False)
        cartItem = order.orderitem_set.all()

        # get total purchase amount and sent through email.
        if city.upper() == "SYDNEY":
            CHARGE = 20
        else:
            CHARGE = 60

        finalTotal = int(order.get_cartTotalPrice + CHARGE)

        # checking if the cart item is available in the store
        for cart in cartItem:
            product = Product.objects.get(id=cart.product.id)
            if product.stock < cart.quantity:
                messages.warning(
                    request, f'{product.name} is out of stock. only {product.stock} is available.')
                return redirect('checkout')

        # updating the product stock after order.
        for cart in cartItem:
            product = Product.objects.get(id=cart.product.id)
            product.stock -= cart.quantity
            product.save()

        form = ShippingAddress(
            user=request.user, order=order, address=address, city=city, finalTotal=finalTotal)
        form.save()

    items = []
    site = SiteInfo.objects.all()[:1].get()
    order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}
    context = {'items': items, 'order': order, 'site': site}
    return redirect('payment')




#site payment page.
def payment(request):
    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
        total = int(order.get_cartTotalPrice)    
    else:
        order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}
        total = 0

    products = Product.objects.all()
    site = SiteInfo.objects.all()[:1].get()
    context = {'products': products, 'order': order, 'site': site, 'total': total}
    return render(request, 'store/frontend/paypal.html', context)    



#confirm payment, set order complete to True and clear the cart.
def paymentConfirmation(request, pk):
    order = Order.objects.get(id=pk)
    order.complete = True
    order.save()

    items = order.orderitem_set.all()
    
    #set token to invalid.
    token = order.token_set.all()
    for i in token:
        i.valid = False
        i.save()

    name = request.user

    #calling above render function.
    params = {
        'items': items,
        'order': order,
        'username' : name,
        'email' : request.user.email,
    }
    
    #calling model function, generate invoice pdf and save
    order.generate_obj_pdf(order.id, params)

    message = "You can see your invoice in your dashboard."

    #sending email
    template = render_to_string('store/frontend/emailbody.html', {
                                'user': request.user, 'message': message})
    email = EmailMessage(

        'Amart Furniture',
        template,
        settings.EMAIL_HOST_USER,
        [request.user.email],
    )
    email.fail_silently = False
    email.send()

    return redirect('store')
     



#search item (search box navbar).
def searchItem(request):
    item_name = request.GET.get('search')
    site = SiteInfo.objects.all()[:1].get()
    products = Product.objects.filter(name__icontains=item_name) | Product.objects.filter(product_code__icontains=item_name)
    category = Category.objects.all()
    slider = Slider.objects.all()[:1].get()
    specials = {}
    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
    else:
        order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}

    context = {'products': products, 'order': order,
               'specials': specials, 'category': category, 'site': site, 'slider': slider}
    return render(request, 'store/frontend/search.html', context)




#sort by price <highest>.
def sortPriceHighest(request):
    products = Product.objects.order_by('-price')
    category = Category.objects.all()
    slider = Slider.objects.get(id=1)
    site = SiteInfo.objects.all()[:1].get()
    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
    else:
        order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}

    context = {'products': products, 'order': order,
               'category': category, 'site': site, 'slider':slider}
    return render(request, 'store/frontend/search.html', context)




#sortby recent item.
def sortProductLatest(request):
    products = Product.objects.order_by('-id')
    category = Category.objects.all()
    site = SiteInfo.objects.all()[:1].get()
    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
    else:
        order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}

    context = {'products': products, 'order': order,
               'category': category, 'site': site}
    return render(request, 'store/frontend/search.html', context)





# sortby price <lowest>.
def sortPriceLowest(request):
    products = Product.objects.order_by('price')
    category = Category.objects.all()
    site = SiteInfo.objects.all()[:1].get()
    slider = Slider.objects.get(id=1)
    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
    else:
        order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}

    context = {'products': products, 'order': order,
               'category': category, 'site': site, 'slider': slider}
    return render(request, 'store/frontend/search.html', context)




#sortby category.
def sortCategory(request, pk):
    products = Product.objects.filter(category=pk)
    category = Category.objects.all()
    slider = Slider.objects.get(id=1)
    site = SiteInfo.objects.all()[:1].get()
    if request.user.is_authenticated:
        order, created = Order.objects.get_or_create(
            user=request.user, complete=False)
    else:
        order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}

    context = {'products': products, 'order': order,
               'category': category, 'site': site, 'slider': slider}
    return render(request, 'store/frontend/search.html', context)

















""" List of authentication controller """

#msg (count inbox numbers send by customer to manager)

# login user
def login_view(request):
    form = LoginForm()
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.warning(request, 'credentials didnt match.')
    order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}
    context = {'form': form, 'order': order}
    return render(request, 'store/authentication/login.html', context)


# register new account
def register(request):
    form = RegisterForm()
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()

            # assigning each new user to customer group
            group = Group.objects.get(name="customer")
            user.groups.add(group)

            messages.success(request, 'Your account has been created.')
            return redirect('login')

    order = {'get_cartTotalItems': 0, 'get_cartTotalPrice': 0}
    context = {'form': form, 'order': order}
    return render(request, 'store/authentication/register.html', context)



""" List of backend controller """

# logout user
def logout_view(request):
    logout(request)
    return redirect('store')


#order list page <customer>.
@login_required(login_url='/login/')
def orderList(request):
    try:
        # items = Order.objects.get(user=request.user, complete=True)
        items = OrderItem.objects.filter(user=request.user)
        msg = CustomerContactManager.objects.filter(seen=False).count()

        context = {'items': items, 'msg':msg}
        return render(request, 'store/backend/orderhistory.html', context)
    except:
        context = {'msg':msg}
        return render(request, 'store/backend/orderhistory.html', context)


#dashboard page
@login_required(login_url='/login/')
def dashboard(request):
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'msg':msg}
    return render(request, 'store/backend/welcome.html', context)



#site update <logo, about detail> page.
@login_required(login_url='/login/')
def sitecustom(request):
    site = SiteInfo.objects.all()[:1].get()
    if request.method == "POST":
        form = SiteUpdateForm(request.POST, request.FILES, instance=site)
        if form.is_valid():
            form.save()
            messages.success(request, 'site info updated!')
            return redirect('site-custom')
    form = SiteUpdateForm(instance=site)
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'form': form, 'msg':msg}
    return render(request, 'store/backend/sitecustom.html', context)



#password change.
@login_required(login_url='/login/')
def password_change(request, pk):
    if request.user.id == pk:
        try:
            user = User.objects.get(id=pk)
            if request.method == 'POST':
                form = PasswordChangeForm(request.user, request.POST)
                if form.is_valid():
                    user = form.save()
                    update_session_auth_hash(request, user)
                    messages.success(
                        request, 'Your password was successfully updated!')
                    return redirect('dashboard')
                messages.warning(request, 'credentials didnt match!!')

            form = PasswordChangeForm(request.user)
            msg = CustomerContactManager.objects.filter(seen=False).count()
            context = {'form': form, 'msg':msg}
            return render(request, 'store/backend/password_change.html', context)

        except:
            return redirect('dashboard')
    else:
        return redirect('store')



#list product.
@login_required(login_url='/login/')
@page_access(allowed=['manager', 'store assistant'])
def products(request):
    products = Product.objects.all()
    myFilter = ProductFilter(request.GET, queryset=products)
    products = myFilter.qs
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'products': products, 'myFilter': myFilter, 'msg':msg}
    return render(request, 'store/backend/products.html', context)



#product add.
@login_required(login_url='/login/')
@page_access(allowed=['manager', 'store assistant'])
def add_product(request):
    if request.method == "POST":
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('products')
    form = ProductForm()
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'form': form, 'msg':msg}
    return render(request, 'store/backend/add_product.html', context)


#add category.
@login_required(login_url='/login/')
@page_access(allowed=['manager', 'store assistant'])
def add_category(request):
    if request.method == "POST":
        form = CategoryForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('add_category')
    form = CategoryForm()
    categories = Category.objects.all()
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'form': form, 'categories': categories, 'msg':msg}
    return render(request, 'store/backend/add_category.html', context)


#delete category.
@login_required(login_url='/login/')
@page_access(allowed=['manager', 'store assistant'])
def delete_category(request, pk):
    if request.method == "POST":
        try:
            category = Category.objects.get(id=pk)
            category.delete()
            return redirect('add_category')
        except:
            messages.warning(request, 'something went wrong!!')
        return redirect('add_category')


# delete product.
@login_required(login_url='/login/')
@page_access(allowed=['manager', 'store assistant'])
def delete_product(request, pk):
    if request.method == "POST":
        try:
            product = Product.objects.get(id=pk)
            product.delete()
            return redirect('products')
        except:
            messages.warning(request, 'something went wrong!!')
        return redirect('products')


#update product.
@login_required(login_url='/login/')
@page_access(allowed=['manager', 'store assistant'])
def edit_product(request, pk):
    product = Product.objects.get(id=pk)
    if request.method == "POST":
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            messages.success(request, 'Product has been updated!!')
            return redirect('products')
    form = ProductForm(instance=product)
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'form': form, 'msg':msg}
    return render(request, 'store/backend/add_product.html', context)


#update profile <email, username, ..>
@login_required(login_url='/login/')
def update_profile(request, pk):
    if request.method == "POST":
        user_profile = Profile.objects.get(user=pk)
        user_form = UserUpdateForm(request.POST, instance=request.user)
        profile_form = ProfileUpdateForm(request.POST, instance=user_profile)
        if user_form and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, 'Profile Updated Successfully!!')

    user_profile = Profile.objects.get(user=pk)
    user_form = UserUpdateForm(instance=request.user)
    profile_form = ProfileUpdateForm(instance=user_profile)
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'user_form': user_form, 'profile_form': profile_form, 'msg':msg}
    return render(request, 'store/backend/update_profile.html', context)




""" store assistant functions """ 
#view outofstock product.
@login_required(login_url='/login/')
@page_access(allowed=['store assistant'])
def contactManager(request):
    products = Product.objects.filter(stock=0)
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'products': products, 'msg':msg}
    return render(request, 'store/backend/contactmanager.html', context)


#email manager.
@login_required(login_url='/login/')
@page_access(allowed=['store assistant'])
def emailManager(request):

    # getting email of a user related to manager group
    group = Group.objects.get(name="manager")
    usersList = group.user_set.all()
    emails = []
    for user in usersList:
        emails.append(user.email)

    # getting message from form input
    message = request.POST.get('message')

    # sending email
    for email in emails:
        template = render_to_string(
            'store/frontend/emailbody.html', {'message': message})
        email = EmailMessage(
            'Amart-message',
            template,
            settings.EMAIL_HOST_USER,
            [email],
        )
        email.fail_silently = False
        email.send()
    
    return redirect('contact_manager')


#list custom design order.
@login_required(login_url='/login/')
@page_access(allowed=['store assistant'])
def customOrder(request):
    orders = CustomOrder.objects.order_by('-id')
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'orders': orders, 'msg':msg}
    return render(request, 'store/backend/customorder.html', context)


#custom design detail page.
@login_required(login_url='/login/')
@page_access(allowed=['store assistant'])
def customOrderView(request, pk):
    orders = CustomOrder.objects.get(id=pk)
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'orders': orders}
    return render(request, 'store/backend/customorderView.html', context)





#email custom design order <manager>.
@login_required(login_url='/login/')
@page_access(allowed=['store assistant'])
def customOrderEmail(request, pk):
    
    orders = CustomOrder.objects.get(id=pk)

    # getting email of a user related to manager group
    group = Group.objects.get(name="manager")
    usersList = group.user_set.all()
    emails = []
    for user in usersList:
        emails.append(user.email)

    # getting detail for the order
    date = orders.date
    email = orders.user.email
    user = orders.user
    size = orders.size
    materials = orders.materials
    extra_items = orders.extra_items
    custom_details = orders.custom_details

    # sending email
    for email in emails:
        template = render_to_string('store/backend/orderemail.html', {'date': date, 'email': email, 'user': user,
                                                                      'size': size, 'materials': materials, 'extra_items': extra_items, 'custom_details': custom_details})
        email = EmailMessage(
            'Amart (custom order message)',
            template,
            settings.EMAIL_HOST_USER,
            [email],
        )
        email.fail_silently = False
        email.send()

    orders.sent = True
    orders.save()
    return redirect('custom-order')


#item delete <custom design order>.
@login_required(login_url='/login/')
@page_access(allowed=['store assistant'])
def customOrderDelete(request, pk):
    if request.method == "POST":
        try:
            orders = CustomOrder.objects.get(id=pk)
            orders.delete()
            return redirect('custom-order')
        except:
            messages.warning(request, 'something went wrong!!')
        return redirect('custom-order')











""" <manager> functions """

# delivery product status.
@login_required(login_url='/login/')
@page_access(allowed=['manager'])
def deliveryList(request):
    products = ShippingAddress.objects.order_by('-id')
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'products': products, 'msg':msg}
    return render(request, 'store/backend/delivery_page.html', context)
    

#customer message  <manager>.   
@login_required(login_url='/login/')
@page_access(allowed=['manager'])
def customerMsgList(request):
    msg1 = CustomerContactManager.objects.all()
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'msg1': msg1, 'msg': msg}
    return render(request, 'store/backend/customer_message_manager.html', context)


# edit delivery status <get request>.
@login_required(login_url='/login/')
@page_access(allowed=['manager'])
def changeStatus(request, pk):
    product = ShippingAddress.objects.get(id=pk)
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'product': product, 'msg':msg}
    return render(request, 'store/backend/delivery_status.html', context)


# update delivery status <post request>.
@login_required(login_url='/login/')
@page_access(allowed=['manager'])
def updateStatus(request, pk):
    if request.method == "POST":
        product = ShippingAddress.objects.get(id=pk)
        status = request.POST.get('delivery_status')
        product.delivery_status = status
        product.save()
        messages.success(request, 'Status Updated!!')    
    return redirect('deliveryList')


# slider list.
@login_required(login_url='/login/')
@page_access(allowed=['manager'])
def sliderList(request):
    slider = Slider.objects.get(id=1)
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'slider': slider, 'msg': msg}
    return render(request, 'store/backend/sliderView.html', context)


# slider update.
@login_required(login_url='/login/')
@page_access(allowed=['manager'])
def sliderUpdate(request, pk):
    slider = Slider.objects.get(id=pk)
    
    if request.method == "POST":
        form = SliderForm(request.POST, request.FILES, instance=slider)
        if form.is_valid():
            form.save()
            messages.success(request, 'Banner has been Updated!!')
            return redirect('slider_list')
        

    form = SliderForm(instance=slider)
    msg = CustomerContactManager.objects.filter(seen=False).count()
    context = {'slider': slider, 'msg': msg, 'form': form}
    return render(request, 'store/backend/sliderUpdate.html', context)




#generate report view.
@login_required(login_url='/login/')
@page_access(allowed=['manager'])
def Report(request):
    context = {}
    return render(request, 'store/backend/sitereport.html', context)



#generating report and converting it into pdf.
def render_to_pdf(path, params):
        template = get_template(path)
        html = template.render(params)
        response = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), response)
        if not pdf.err:
            return HttpResponse(response.getvalue(), content_type='application/pdf')
        else:
            return HttpResponse("Error Rendering PDF", status=400)
    

def generate_pdf_report(request):
    obj = OrderItem.objects.all()
    total = int(sum([i.product.price for i in obj]))
    params = { "params": obj, "total":total }
    pdf = render_to_pdf('store/backend/reportpdf.html', params)

    if pdf:
        response = HttpResponse(pdf, content_type='application/pdf')
        filename = "Invoice_%s.pdf" %("12341231")
        content = "inline; filename='%s'" %(filename)
        download = request.GET.get("download")
        if download:
            content = "attachment; filename='%s'" %(filename)
        response['Content-Disposition'] = content
        return response
        
    return HttpResponse("Not found") 






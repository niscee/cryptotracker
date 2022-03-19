from django.db import models
from django.contrib.auth.models import User
import uuid
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from ckeditor.fields import RichTextField


 
#render html page to pdf.
from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
import xhtml2pdf.pisa as pisa
from django.core.files import File


#list of models
class SiteInfo(models.Model):
    logo = models.ImageField(null=True, blank=True)
    about = RichTextField(null=True, blank=True, config_name='awesome_ckeditor')
    
    @property
    def imageURL(self):
        try:
            url = self.logo.url
        except:
            url = ''
        return url       
           

class Profile(models.Model):
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)
    address = models.CharField(max_length=200, null=True, default=None)
    phone = models.CharField(max_length=200, default=None, null=True)


class Category(models.Model):
    c_name = models.CharField(max_length=200) 

    def __str__(self):
        return self.c_name   
        

class Product(models.Model):
    name = models.CharField(max_length=200)
    product_code = models.CharField(max_length=200, default=None, null=False, blank=False)
    price = models.FloatField()
    category = models.ForeignKey(Category, default=None, null=True, blank=True, on_delete=models.CASCADE)
    special = models.BooleanField(default=False, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    detail = models.TextField(null=True, blank=True)
    stock = models.IntegerField(default=1)

    def __str__(self):
        return self.name
    
    """ prevent getting error when no image is associated to product """
    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url    




class Slider(models.Model):
    image1 = models.ImageField(null=False, blank=True)
    image2 = models.ImageField(null=False, blank=True)
    image3 = models.ImageField(null=False, blank=True)
    
    
    """ prevent getting error when no image is associated to product """
    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url 
    
        



class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    transaction_id = models.UUIDField(default=uuid.uuid4, editable = False, unique=True)
    payment = models.BooleanField(default=False)
    pdf = models.FileField(upload_to='pdfs/', null=True, blank=True)
    

   

    def __str__(self):
        return str(self.transaction_id)
    
    #getting the total cost of cart Items
    @property
    def get_cartTotalPrice(self):
        orderitems = self.orderitem_set.all()
        totalPrice = sum([item.get_totalPrice for item in orderitems])
        
        #validating shipping charge
        try:
            ship_address = self.shippingaddress_set.all()[0]
            if ship_address.city.upper() == "SYDNEY":
                CHARGE = 20
            else:
                CHARGE = 60
        except:
            CHARGE = 0
            
        return totalPrice + CHARGE
           
    
    #getting total nuber of items in cart
    @property
    def get_cartTotalItems(self):
        orderitems = self.orderitem_set.all()
        totalItems = sum([item.quantity for item in orderitems])
        return totalItems 

   

    def render_to_pdf(self, path, params):
        template = get_template(path)
        html = template.render(params)
        response = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), response)
        if not pdf.err:
            return HttpResponse(response.getvalue(), content_type='application/pdf')
        else:
            return HttpResponse("Error Rendering PDF", status=400)
    

    def generate_obj_pdf(self, instance_id, params):
        obj = Order.objects.get(id=instance_id)
        pdf = self.render_to_pdf('store/frontend/pdf.html', params)
        filename = "Invoice_%s.pdf" %("1")
        obj.pdf.save(filename, File(BytesIO(pdf.content)))  



class Token(models.Model):
    code = models.CharField(max_length=200)
    valid = models.BooleanField(default=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    stock = models.IntegerField(null=True) 
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)



class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    code = models.BooleanField(default=False)

    class Meta:
        ordering = ['-date_added']
        

    #getting total price of the single order item
    @property
    def get_totalPrice(self):
        if self.code == False:
            total = self.product.price * self.quantity
            return total 

        total = self.product.price * self.quantity - ((self.product.price * self.quantity)*20)/100
        return total     


    def __str__(self):
        return str(self.order)              



class ShippingAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    delivery_status = models.CharField(max_length=200, null=True, blank=True, default="pending")
    finalTotal = models.FloatField(default=0)

    def __str__(self):
        return self.address

    
class CustomOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    date = models.DateField(auto_now=False, auto_now_add=False, verbose_name = 'Required Date', help_text = "Please use the following format: <em>YYYY-MM-DD</em>.")
    size = models.TextField(null=True, blank=True, verbose_name = 'Size and Measurments')
    extra_items = models.TextField(null=True, blank=True, verbose_name = 'Additional Items')
    custom_details = models.TextField(null=True, blank=True, verbose_name = 'Customization Details')
    materials = models.TextField(null=True, blank=True, verbose_name = 'Materials and Fabrics')
    sent = models.BooleanField(default=False, null=True, blank=True)


class CustomerContactManager(models.Model):
    messages = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    seen = models.BooleanField(default=False, null=True, blank=True)

    


""" list of signals """
#initiatied whenever user creates a new account.
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
     


# def create_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)

# post_save.connect(create_profile, sender=User)  
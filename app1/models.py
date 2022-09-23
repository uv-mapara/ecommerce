from django.db import models

# Create your models here.
class Signup(models.Model):
    username=models.CharField( max_length=50)
    email=models.EmailField(max_length=254)
    phone=models.IntegerField()
    password=models.CharField(max_length=50)
    confirmpassword=models.CharField(max_length=50,default='')

    def __str__(self):
        return self.username

class Category(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class SubCategory(models.Model):
    category = models.ManyToManyField(Category)
    name=models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Product(models.Model):
    categories = models.ManyToManyField(Category)
    sub_category = models.ManyToManyField(SubCategory)
    name = models.CharField(max_length=200,default='')
    price = models.FloatField()    
    des=models.TextField(max_length=200,default='')
    image=models.ImageField(upload_to='pro_img',blank=True,default='')
    date=models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

class Mycart(models.Model):
    user=models.ForeignKey(Signup, on_delete=models.CASCADE)
    product=models.ForeignKey(Product, on_delete=models.CASCADE)
    status=models.BooleanField(default=False)
    added_on = models.DateTimeField(auto_now_add=True,null=True)
    update_on= models.DateTimeField(auto_now_add=True,null=True)        

class Contact(models.Model):
     firstname= models.CharField(max_length=200,blank = False,null = False)
     lastname= models.CharField(max_length=200,blank = False,null = False)
     email=models.EmailField(blank = False,null = False)
     message=models.CharField(max_length=50000,blank = False,null = False)

     def __str__(self):
          return self.email
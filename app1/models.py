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
    subcategory = models.ManyToManyField(SubCategory)
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    des=models.TextField(max_length=200)
    images=models.ImageField(upload_to='pro_img',blank=True)

    def __str__(self):
        return self.name

class Contact(models.Model):
     firstname= models.CharField(max_length=200,blank = False,null = False)
     lastname= models.CharField(max_length=200,blank = False,null = False)
     email=models.EmailField(blank = False,null = False)
     message=models.CharField(max_length=50000,blank = False,null = False)

     def __str__(self):
          return self.email
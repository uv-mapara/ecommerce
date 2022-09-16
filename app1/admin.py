from django.contrib import admin
from .models import Signup,Contact,Category,SubCategory,Product

# Register your models here.

admin.site.register(Signup)
admin.site.register(Contact)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Product)

admin.site.site_title = "UV Project"
admin.site.site_header = "UV Project"

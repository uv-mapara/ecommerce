from django.contrib import admin
from django.urls import path
from . import views
from .views import signup,signupAuthentication,login,logout,forgot_pass,forgotOtp,newpassword,home,productview,contact,add_to_cart,show_mycart,remove_cart
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [ 
    path('signup', signup,name='signup'), 
    path('signupAuthentication', signupAuthentication,name='signupAuthentication'), 
    path('login', login,name='login'),
    path('logout/',logout,name = 'logout'),
    path('forgotpass',forgot_pass,name = 'forgotpass'),
    path('forgotOtp', forgotOtp,name='forgotOtp'),
    path('newpassword', newpassword,name='newpassword'), 
    path('home', home,name='home'),
    path('productview/<int:pk>', productview,name='productview'), 
    path('contact',contact,name='contact'), 
    path('addtocart/<int:pk>/',add_to_cart,name="addtocart"),
    path('showmycart',show_mycart,name="showmycart"),
    path('deleteitem/<int:id>/',remove_cart, name='deleteitem'),
     
]+static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
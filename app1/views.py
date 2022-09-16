from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse,JsonResponse
from .models import Signup,Category,Product,Contact
from django.contrib import messages
from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
import random
import json
# import smtplib, ssl

# Create your views here.
sign=Signup()
def signup(request):       
    if request.method=='POST':       
        sign.username= request.POST.get('username')
        sign.email= request.POST.get('email')
        sign.phone=request.POST.get('phone')
        sign.password=request.POST.get('password')
        sign.confirmpassword=request.POST.get('confirmpassword')
       
        opstatus=''
       
        if Signup.objects.filter(email=sign.email).exists():
            print("hello")
            return JsonResponse({'opstatus':'Error'})
        else: 
            print("otp send")       
            otp = ''
            rand = random.choice('0123456789')
            rand1 = random.choice('0123456789')
            rand2 = random.choice('0123456789')
            rand3 = random.choice('0123456789')
            otp = rand + rand1 + rand2 + rand3
            print(otp)
            request.session['otp'] = otp                  

            subject = 'Email Verification'
            message = otp
            email_from= settings.EMAIL_HOST_USER
            recipient_list = [sign.email]
            send_mail( subject, message, email_from, recipient_list )                                             
            return JsonResponse({'opstatus':'Success'})
    return render(request,'signup.html')  

def signupAuthentication(request):
    if request.session.has_key('otp'):
        otp = request.session['otp']        
        try:
            otpobj = request.POST.get('otp')
            if otpobj == None:                
                return render(request,'signupAuthentication.html')
            if otp == request.POST.get('otp'):
                sign.save()
                print(sign.email)
                return redirect('login')
            else:
                return redirect("login")
        except:
            return redirect('signup')
    return render(request,'SignupAuthentication.html')   

def login(request):
    if request.method=="POST":
        try:
            e=request.POST['email']
            request.session['email']=e
            print(e)
            p=request.POST['password']
            print(e,p)
            x=Signup.objects.get(email=e)
            if x.password==p:                
                return JsonResponse({'opstatus':'PasswordSuccess'})                                        
            else:
                return JsonResponse({'opstatus':'PasswordError'})                
        except:
            return JsonResponse({'opstatus':'EmailError'})
    return render(request,'login.html') 

def home(request):
    if request.session.has_key('email'):
        # a=Product.objects.all()
        user1 = request.session['email']
        print(user1)
        per = Signup.objects.get(email=user1)
        print(per.username) 

        category=Category.objects.all()
        product=Product.objects.all()
    return render(request,"home.html",{'per':per,'category':category,'product':product}) 

def logout(request):
    if request.session.has_key('email'):
        del request.session['email']
        return redirect('login')

def forgot_pass(request):    
    email = request.POST.get('email')
    request.session['username'] = email

    if email == None:
        return render(request,'forgotpassword.html')

    if Signup.objects.filter(email=email).exists():
        print(email)
        otp = ''
        rand = random.choice('0123456789')
        rand1 = random.choice('0123456789')
        rand2 = random.choice('0123456789')
        rand3 = random.choice('0123456789')
        otp = rand + rand1 + rand2 + rand3
        print(otp)
        request.session['otp'] = otp
            
        subject = 'Forgot Password'
        message = otp
        email_from= settings.EMAIL_HOST_USER
        recipient_list = [email]
        print(recipient_list)
        send_mail( subject, message, email_from, recipient_list )
        return JsonResponse({'opstatus':'Success'})   
    else:
        return JsonResponse({'opstatus':'Error'})                 

def forgotOtp(request):
    if request.session.has_key('otp'):
        otp = request.session['otp']
        try:
            otpobj = request.POST.get('otp')            
            if otp == otpobj:
                return JsonResponse({'opstatus':'Success'})
        except:
            return redirect('forgotOtp')
    return render(request,'forgotOtp.html')

def newpassword(request):
    if request.session.has_key('email'):
        new_pass = request.POST.get('newpassword')        
        obj = Signup.objects.get(email = request.session['username'])
        print(obj.id)
        obj.password = new_pass
        obj.confirmpassword = new_pass
        obj.save()
        return JsonResponse({'opstatus':'Success'})
    return render(request,'newpassword.html')

def productview(request,pk):
    p = get_object_or_404(Product, pk=pk)
    return render(request,'productview.html',{'p':p})

def contact(request):
    if request.method=='POST':
        obj=Contact()
        obj.firstname= request.POST['firstname']
        obj.lastname= request.POST['lastname']
        obj.email= request.POST['email']
        obj.message= request.POST['message'] 
        obj.save()                               
    return render(request,'contact.html')

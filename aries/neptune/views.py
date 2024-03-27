from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from .forms import RegistrationForm
from .forms import LoginForm
from .forms import ProfUpdate
from django.contrib.auth import logout
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages

class HomeView(TemplateView):
    template_name='home2.html'

def home2(request):
    return render(request, 'home2.html')

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login') 
    else:
        form = RegistrationForm()

    return render(request, 'register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home2')
        else:
            messages.error(request, "Invalid credentials. Please try again.")
    else:
        form = LoginForm(request)

    return render(request, 'login.html', {'form': form})

@login_required
def profile(request):
    user = request.user

    if request.method == 'POST':
        form = ProfUpdate(request.POST, instance=user)
        form.save()
        messages.success(request, 'Your profile has been updated successfully!')
        return redirect('profile') 
    else:
        form = ProfUpdate(instance=user) 

    return render(request, 'profile.html', {'form': form})

def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
    return redirect('home2')

def weather(request):
    return render(request, 'weather.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

def termsof(request):
    return render(request, 'termsof.html')

def privacy(request):
    return render(request, 'privacy.html')
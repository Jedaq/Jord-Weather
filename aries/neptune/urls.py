from django.urls import path
from .views import *
from .views import HomeView

urlpatterns = [
    path('', HomeView.as_view(), name='home2'),
    path('', home2, name='home2'),
    path('login/',login_view, name='login'),
    path('logout/',logout_view, name='logout'),
    path('profile/', profile, name='profile'),
    path('weather/', weather, name='weather'),
    path('register/', register, name='register'),
    path('about/', about, name='about'),
    path('contact/', contact, name='contact'),
    path('termsof/', termsof, name='termsof'),
    path('privacy/', privacy, name='privacy')
]

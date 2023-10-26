from django.urls import re_path
from . import views

urlpatterns = [
   re_path('login', views.login),
   re_path('register', views.register),
   re_path('test_token', views.test_token)
]

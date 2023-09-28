from django.contrib import admin
from django.urls import path
from .views import AuthURL

urlpatterns = [
    path('/get_auth', AuthURL.as_view()),

]
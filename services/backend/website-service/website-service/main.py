#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.core.management.utils import get_random_secret_key
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.urls import path, re_path
from .decorators import *
import os

DEBUG = True
SECRET_KEY = os.environ.get('DJANGO_SECRET', get_random_secret_key())
ROOT_URLCONF = __name__
TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [
        'templates/'
    ],
}]


def template(template_name):
    def decorator(func):
        def wrapper(request, *args, **kwargs):
            context = func(request, *args, **kwargs)
            return render(request, template_name, context)
        return wrapper
    return decorator


@template('index.html')
def home(_):
    return locals()

#TODO: move this to backend/api-service
def test(_):
    return HttpResponse("<p>fuck you :3</p>")


urlpatterns = [
    #TODO: move this to backend/api-service
    path('api/v1/test', test, name='test'),

    re_path(r'^$', home, name='home'),
    re_path(r'.*', lambda _: redirect('home')),
]

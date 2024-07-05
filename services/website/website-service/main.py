#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.core.management.utils import get_random_secret_key
from django.http import HttpResponse
from django.shortcuts import redirect
from django.urls import path, re_path
from .decorators import template
import os


DEBUG = True
SECRET_KEY = os.environ.get('DJANGO_SECRET', get_random_secret_key())
ROOT_URLCONF = __name__

INSTALLED_APPS = [
    "django.contrib.staticfiles",
]
TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [
        '/app/dist/',
        'frontend/dist/',
    ],
}]
STATICFILES_DIRS = [
    "/app/dist/static/",
    "frontend/dist/static",
]
STATIC_URL = 'static/'


@template('index.html')
def home(_):
    title = "Welcome"
    website_title = "ft_trans"
    return locals()


# TODO: move this to backend/api-service
def test(_):
    return HttpResponse("<p>fuck you :3</p>")


urlpatterns = [
    # TODO: move this to backend/api-service
    path('api/v1/test', test, name='test'),

    re_path(r'^$', home, name='home'),
    re_path(r'^(?!static\/|$)', lambda _: redirect('home')),
]

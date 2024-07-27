"""
URL configuration for backend project.
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from backend import settings

urlpatterns = [path("admin/", admin.site.urls), path("api/", include("api.urls"))]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

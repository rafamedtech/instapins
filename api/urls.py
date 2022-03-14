from django.urls import path, include
from .views import GetRoutes

urlpatterns = [
    path('', GetRoutes.as_view()),
    path('uploads/', include('uploads.urls')),
]
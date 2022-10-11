from django.urls import path
from . import views



urlpatterns = [
 
    path('', views.booking.as_view(), name='booking'),
    


] 
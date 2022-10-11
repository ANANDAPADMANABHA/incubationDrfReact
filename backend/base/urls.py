from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
 
        path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('BookingList/', views.BookingList.as_view(), name='BookingList'),
        path('ApprovedList/', views.ApprovedList.as_view(), name='ApprovedList'),
        path('DeclinedList/', views.DeclinedList.as_view(), name='DeclinedList'),
        path('SlotList/', views.SlotList.as_view(), name='SlotList'),
        path('DeleteUser/<int:id>', views.DeleteUser.as_view(), name='DeleteUser'),
        path('CreateSlot/', views.CreateSlot.as_view(), name='CreateSlot'),
        path('BookSlot/<int:id>', views.BookSlot.as_view(), name='BookSlot'),
        path('ApproveBooking/<int:id>', views.ApproveBooking.as_view(), name='ApproveBooking'),
        path('DeclineBooking/<int:id>', views.DeclineBooking.as_view(), name='DeclineBooking'),
        path('DeleteSlot/<int:id>', views.DeleteSlot.as_view(), name='DeleteSlot'),
        path('ViewApplicationDetails/<int:id>', views.ViewApplicationDetails.as_view(), name='ViewApplicationDetails'),



        





 
      


] 
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import BookingSerializer
from rest_framework import status
from base.models import UserAccount
from .models import Booking
# Create your views here.


class booking(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        data = request.data
        print('USER',request.user)
        newBooking =Booking(user = request.user,fullname=data['fullname'],phone = data['phone'],company_name = data['company_name'],city = data['city'],state = data['state'],email = data['email'],address = data['address'])
        newBooking.save()

        return Response(status=200)
     

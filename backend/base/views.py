from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from userside.models import Booking ,BookingSlot
from userside.serializers import BookingSerializer,BookingSlotSerializer
from base.models import UserAccount
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class BookingList(APIView):
    def get(self,request):
        bookings = Booking.objects.filter(approved =False, pending = True,declined =False)
        list = BookingSerializer(bookings,many=True)

        if list :
            return Response(list.data,status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

class ApprovedList(APIView):
    def get(self,request):
        bookings = Booking.objects.filter(approved =True,allotted = False)
        list = BookingSerializer(bookings,many=True)

        if list :
            return Response(list.data,status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

class DeclinedList(APIView):
    def get(self,request):
        bookings = Booking.objects.filter(declined =True)
        list = BookingSerializer(bookings,many=True)

        if list :
            return Response(list.data,status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

class SlotList(APIView):
    def get(self,request):
        slots = BookingSlot.objects.all()
        bookingSlot = BookingSlotSerializer(slots,many = True)

        if bookingSlot:
            return Response(bookingSlot.data,status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

class DeleteUser(APIView):
    def post(self,request,id):
        user = UserAccount.objects.get(id=id)
        user.delete()
        return Response(status=status.HTTP_200_OK)

class CreateSlot(APIView):
    def post(self,request):
        data = request.data
        newSlot = BookingSlot(room = data["room_number"])
        newSlot.save()
        return Response(status.HTTP_200_OK)

class BookSlot(APIView):
    def post(self,request,id):
        data = request.data
        print("***********************************************************************")
        print(id)
        print(data['booking'])
        slot = BookingSlot.objects.get(id = id)
        booking = Booking.objects.get(id = data['booking'])
        booking.allotted =True
        booking.pending = False
        booking.save()
       

        slot.is_booked =True
        slot.booking = booking
        slot.save()
       
        return Response(status.HTTP_200_OK)

class ApproveBooking(APIView):
    def post(self,request,id):
        booking = Booking.objects.get(id = id)
        booking.approved = True
        booking.pending = False
        booking.save()
        return Response(status.HTTP_200_OK)

class DeclineBooking(APIView):
    def post(self,request,id):
        booking = Booking.objects.get(id = id)
        booking.declined = True
        booking.pending = False
        booking.save()
        return Response(status.HTTP_200_OK)


class DeleteSlot(APIView):
    def post(self,request,id):
        slot = BookingSlot.objects.get(id=id)
        if slot.is_booked :
            slot.booking.allotted = False
            slot.booking.save()
        slot.delete()

        return Response(status=status.HTTP_200_OK)

class ViewApplicationDetails(APIView):
    def get(self,request,id):
        booking = Booking.objects.get(id=id)
        detais = BookingSerializer(booking)
        if detais :
            return Response(detais.data,status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)
        

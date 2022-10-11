from dataclasses import field
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.serializers import ModelSerializer
from .models import Booking ,BookingSlot

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer ,cls).get_token(user)
        token["username"] = user.username
        return token

class BookingSerializer(ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class BookingSlotSerializer(ModelSerializer):
    class Meta:
        model = BookingSlot
        fields = '__all__'
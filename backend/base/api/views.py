from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.models import UserAccount

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        # token['is_superuser'] = user.is_superuser

        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)

class RegisterView(APIView):
    def post(self,request):
        data = request.data
        password_confirmation = data['password_confirmation']
        password = data['password']

        if password == password_confirmation:

            UserAccount.objects.create_user(first_name=data['fname'],last_name=data['lname'],email = data['email'],username = data['username'],password = data['password'])
            return Response(status=200)
        else:
            return Response(status=400)
        


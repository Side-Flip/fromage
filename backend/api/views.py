from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.http import HttpResponse
from .models import ApiVendedor
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework_simplejwt.settings import api_settings


class CustomTokenOBtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'username'
    def validate(self, attrs):
        authenticate_kwargs = {
            'username': attrs[self.username_field],
            'password': attrs['password']
        }
        self.user = authenticate(**authenticate_kwargs)

        if self.user is None:
            raise serializers.ValidationError('No se encontro usuario activo con esas credenciales')

        api_settings.USER_ID_FIELD='id_vendedor'
        return super().validate(attrs)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenOBtainPairSerializer

# Create your views here.
def login_view(request):
    return render(request, 'login.html')

def home_view(request):
    return render(request, 'home.html')

def test_view(request):
    try:
        productos = ApiProducto.objects.all()
        if productos.exists():
            productos_list = ", ".join([str(producto) for producto in productos])
            return HttpResponse(f"Productos en la base de datos: {productos_list}")
        else:
            return HttpResponse("No hay productos en la base de datos.")
    
    except Exception as e:
        # Si ocurre algún error, mostramos el error
        return HttpResponse(f"Error al consultar la base de datos: {str(e)}")
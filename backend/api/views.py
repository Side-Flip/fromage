from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password
from django.contrib import messages
from django.http import HttpResponse
from .models import ApiVendedor, ApiProducto
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from rest_framework import generics
from rest_framework import serializers
from django.db.models import Q

class CustomTokenOBtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'username'
    def validate(self, attrs):
        authenticate_kwargs = {
            'username': attrs[self.username_field],
            'password': attrs['password']
        }
        print(f"Autenticando usuario: {attrs[self.username_field]} con contraseña: {attrs['password']}")    

        self.user = authenticate(**authenticate_kwargs)

        if self.user is None:
            raise serializers.ValidationError('No se encontro usuario activo con esas credenciales')

        api_settings.USER_ID_FIELD='id_vendedor'
        return super().validate(attrs)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenOBtainPairSerializer

# Serializer de producto
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiProducto
        fields = '__all__'


# Create your views here.

class ProductoList(generics.ListAPIView):
    queryset = ApiProducto.objects.all()
    serializer_class = ProductoSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        codigo = self.request.query_params.get('codigo', None) #Faltaba esto para la tabla productos
        nombre = self.request.query_params.get('nombre', None)
        precio = self.request.query_params.get('precio', None)
        stock = self.request.query_params.get('stock', None)
        

        if codigo:
            queryset = queryset.filter(id_producto__gte=codigo)
        if nombre:
            queryset = queryset.filter(nombre_producto__icontains=nombre)
        if precio:
            queryset = queryset.filter(precio_producto__gte=precio)
        if stock:
            queryset = queryset.filter(stock__gte=stock)
        return queryset


    

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
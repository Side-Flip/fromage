from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password
from django.contrib import messages
from django.http import HttpResponse
from .models import ApiVendedor, ApiProducto, ApiFactura, ApiDetallefactura, ApiCliente
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

        nombre = self.request.query_params.get('nombre', None)
        precio = self.request.query_params.get('precio', None)
        stock = self.request.query_params.get('stock', None)
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
    

# serializer facturas
class FacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiFactura
        fields = ['fecha_factura', 'id_cliente', 'id_vendedor']

class FacturaCreate(generics.CreateAPIView):
    queryset = ApiFactura.objects.all()
    serializer_class = FacturaSerializer
      

class DetalleFacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiDetallefactura
        fields = ['id_factura', 'cantidad_producto', 'total', 'id_producto']

class DetalleFacturaCreate(generics.CreateAPIView):
    
    queryset = ApiDetallefactura.objects.all()
    serializer_class = DetalleFacturaSerializer

    #def perform_create(self, serializer):
        #factura = self.request.data['id_factura']
        #producto = self.request.data['id_producto']
       # cantidad = self.request.data['cantidad_producto']
       # total = self.request.data['total']

      #  factura_instance = ApiFactura.objects.get(id_factura=factura)
     #   producto_instance = ApiProducto.objects.get(id_producto=producto)

     #  serializer.save(id_factura = factura_instance, id_producto=producto_instance, cantidad_producto=cantidad, total=total )
      #  return super().perform_create(serializer)
        
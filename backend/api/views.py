from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password
from django.contrib import messages
from django.http import HttpResponse
from .models import ApiVendedor, ApiProducto, ApiFactura, ApiDetallefactura, ApiCliente
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from rest_framework import generics, status
from rest_framework import serializers
from rest_framework.response import Response
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
            queryset = queryset.filter(id_producto=codigo)
        if nombre:
            queryset = queryset.filter(nombre_producto__icontains=nombre)
        if precio:
            queryset = queryset.filter(precio_producto__gte=precio)
        if stock:
            queryset = queryset.filter(stock__gte=stock)
        return queryset

# serializer facturas
class FacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiFactura
        fields = ['fecha_factura', 'id_cliente', 'id_vendedor']

class FacturaCreate(generics.CreateAPIView):
    queryset = ApiFactura.objects.all()
    serializer_class = FacturaSerializer

class FactosSerializer(serializers.Serializer):
    id_factura = serializers.IntegerField(read_only=True)
    id_producto = serializers.IntegerField()
    cantidad_producto = serializers.IntegerField()
    total = serializers.FloatField()

    id_cliente = serializers.IntegerField()
    id_vendedor = serializers.IntegerField()
    fecha_factura = serializers.DateField()

    def create(self, validated_data):
        try:
            cliente = ApiCliente.objects.get(pk=validated_data['id_cliente'])
            vendedor = ApiVendedor.objects.get(pk=validated_data['id_vendedor'])
            producto = ApiProducto.objects.get(pk=validated_data['id_producto'])
        except ApiCliente.DoesNotExist:
            raise serializers.ValidationError("El cliente especificado no existe.")
        except ApiVendedor.DoesNotExist:
            raise serializers.ValidationError("El vendedor especificado no existe.")
        except ApiProducto.DoesNotExist:
            raise serializers.ValidationError("El producto especificado no existe.")

        factura_data = {
            'fecha_factura': validated_data['fecha_factura'],
            'id_cliente': cliente,
            'id_vendedor': vendedor 
        }
        factura = ApiFactura.objects.create(**factura_data)

        detalle_data = {
            'id_factura': factura,
            'cantidad_producto': validated_data['cantidad_producto'],
            'total': validated_data['total'],
            'id_producto': producto,
        }
        detalle_factura = ApiDetallefactura.objects.create(**detalle_data)

        return {
            'factura': factura,
            'detalle': detalle_factura
        }

class DetalleFacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiDetallefactura
        fields = ['id_factura', 'cantidad_producto', 'total', 'id_producto']
"""
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
    
"""

class Factos(generics.CreateAPIView):
    serializer_class = FactosSerializer
    # Toca soobreescribir el metodo create para mandar los datos
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            data = serializer.save()
            
            # Preparar la respuesta con los datos guardados
            factura_data = {
                'id_cliente': data['factura'].id_cliente.id_cliente,
                'id_vendedor': data['factura'].id_vendedor.id_vendedor,
                'fecha_factura': data['factura'].fecha_factura.isoformat(),
            }
            detalle_data = {
                'id_factura': data['detalle'].id_factura.id_factura,
                'id_producto': data['detalle'].id_producto.id_producto,
                'cantidad_producto': data['detalle'].cantidad_producto,
                'total': data['detalle'].total,
            }
            
            # Enviar la respuesta con la factura y detalle de factura creados
            return Response({
                'factura': factura_data,
                'detalle_factura': detalle_data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

# Agregar Producto a Factura 
class APaF(generics.UpdateAPIView):
    queryset = ApiProducto.objects.all()
    serializer_class = ProductoSerializer

    def put(self, request, *args, **kwargs):

        # valida que exista el producto
        try:
            producto = ApiProducto.objects.get(pk=self.kwargs['id_producto'])
        except ApiProducto.DoesNotExist:
            return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        # cantidad es el dato que recibe de Geiner 
        cantidad_a_restar = request.data.get('cantidad')
       
        nuevo_stock = producto.stock - int(cantidad_a_restar)

        if nuevo_stock > producto.stock:
            return Response({"error": "No hay stock disponible para la cantidad solicitada"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            producto.stock = nuevo_stock
            producto.save()
              
        serializer = ProductoSerializer(producto)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# Cancelar Productos de Factura
















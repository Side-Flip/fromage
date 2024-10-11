from django.db import models

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.FloatField()
    stock = models.IntegerField()

class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    documento = models.CharField(max_length=20)
    email = models.EmailField(max_length=100)
    telefono = models.CharField(max_length=20)

class Vendedor(models.Model): #Lo que seria nuestro usuario en terminos de login
    nombre = models.CharField(max_length=100)
    documento = models.CharField(max_length=20)
    usuario = models.CharField(max_length=50)
    contrasenia = models.CharField(max_length=50)
    rol = models.CharField(max_length=50)

class Factura(models.Model):
    fecha = models.DateField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    vendedor = models.ForeignKey(Vendedor, on_delete=models.CASCADE)

class DetalleFactura(models.Model):
    factura = models.ForeignKey(Factura, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad_producto = models.IntegerField()
    total = models.FloatField()
from django.db import models

class ApiCliente(models.Model):
    id_cliente = models.BigAutoField(primary_key=True)
    nombre_cliente = models.CharField(max_length=100)
    apellido_cliente= models.CharField(max_length=100)
    documento_cliente = models.CharField(max_length=20)
    email = models.EmailField(max_length=100)
    celular = models.IntegerField()

    class Meta:
        managed = False
        db_table = '"formaggio"."clientes"'

class ApiDetallefactura(models.Model):
    id_factura = models.OneToOneField('ApiFactura', on_delete=models.CASCADE, primary_key=True)
    cantidad_producto = models.IntegerField()
    total = models.FloatField()
    id_producto = models.ForeignKey('ApiProducto', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = '"formaggio"."detalles_facturas"'


class ApiFactura(models.Model):
    id_factura = models.BigAutoField(primary_key=True)
    fecha_factura = models.DateField()
    id_cliente = models.ForeignKey(ApiCliente, models.DO_NOTHING)
    id_vendedor = models.ForeignKey('ApiVendedor', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = '"formaggio"."facturas"'


class ApiProducto(models.Model):
    id_producto = models.BigAutoField(primary_key=True)
    nombre_producto = models.CharField(max_length=100)
    precio_producto = models.FloatField()
    stock = models.IntegerField()

    class Meta:
        managed = False
        db_table = '"formaggio"."productos"'

    def __str__(self):
        return f"Producto: {self.nombre_producto}, Precio: {self.precio_producto}, Stock: {self.stock}"


class ApiVendedor(models.Model):
    id_vendedor = models.BigAutoField(primary_key=True)
    nombre_vendedor = models.CharField(max_length=100)
    documento_vendedor = models.CharField(max_length=20)
    usuario_vendedor = models.CharField(max_length=50)
    contrasenia_vendedor = models.CharField(max_length=50)
    id_rol = models.IntegerField()

    class Meta:
        managed = False
        db_table = '"formaggio"."vendedores"'



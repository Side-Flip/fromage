from django.db import models

class ApiCliente(models.Model):
    id_cliente = models.BigAutoField(primary_key=True)
    nombre_cliente = models.CharField(max_length=100)
    apellido_cliente= models.CharField(max_length=100)
    documento_cliente = models.CharField(max_length=20)
    email = models.CharField(max_length=100)
    celular = models.CharField(max_length=20)

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
    rol = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = '"formaggio"."vendedores"'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Laboratorio(models.Model):
    nombre = models.CharField(max_length=200, blank=True, null=True)
    descripcion = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'laboratorio'

    fecha = models.DateField(blank=True, null=True)
    hora = models.TimeField(blank=True, null=True)
    id_servicio = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pedido'
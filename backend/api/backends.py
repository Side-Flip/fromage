from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from api.models import ApiVendedor 

class CustomUserBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = ApiVendedor.objects.get(usuario_vendedor=username, contrasenia_vendedor=password)
            
            # Puedes agregar validaciones adicionales aquí
            if user:
                return user
        except ApiVendedor.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return ApiVendedor.objects.get(pk=id_vendedor)
        except ApiVendedor.DoesNotExist:
            return None
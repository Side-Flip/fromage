from django.apps import AppConfig
from django.dispatch import receiver
from django.db.models.signals import post_migrate

def custom_user_authentication_rule(user):
    return True  # Cambia esta lógica según tus necesidades

@receiver(post_migrate)
def set_user_authentication_rule(sender, **kwargs):
    from rest_framework_simplejwt.authentication import api_settings
    api_settings.USER_AUTHENTICATION_RULE = custom_user_authentication_rule
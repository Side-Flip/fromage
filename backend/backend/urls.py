"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api import views
from api.views import CustomTokenObtainPairView, ProductoList, Factos, APaF


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home_view, name='home'),
    path('login/', views.login_view, name='login'),
    path("test/", views.test_view),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/productos/', ProductoList.as_view(), name='productos'),
    
    path('api/APaF/<int:id_producto>/', APaF.as_view(), name='agregar-productos-factura'),
    #path('api/factura/', FacturaCreate.as_view(), name = 'factura'),
    #path('api/detallefactura/', DetalleFacturaCreate.as_view(), name = 'detallefactura'),
    path('api/crear-factura/', Factos.as_view(), name = 'hola'),
]

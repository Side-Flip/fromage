from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.http import HttpResponse
from .models import ApiProducto

# Create your views here.
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid username or password')

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
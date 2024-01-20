from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet, EnderecoViewSet

router = DefaultRouter()
router.register(r'Cliente', ClienteViewSet)
router.register(r'Endereco', EnderecoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

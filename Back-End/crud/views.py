from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from .models import Cliente, Endereco
from .serializers import ClienteSerializer, EnderecoSerializer
from .services import pong

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class EnderecoViewSet(viewsets.ModelViewSet):
    queryset = Endereco.objects.all()
    serializer_class = EnderecoSerializer

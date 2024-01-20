from django.db import models

class Endereco(models.Model):
    cep = models.CharField(max_length=8)
    logradouro = models.CharField(max_length=80)
    complemento = models.CharField(max_length=20, blank=True)
    bairro = models.CharField(max_length=29) # O maior bairro é "São José do Vale do Rio Preto"
    cidade = models.CharField(max_length=29) # A maior cidade é "São José do Vale do Rio Preto"
    estado = models.CharField(max_length=2) # Armazenar em sigla

class Cliente(models.Model):
    nome = models.CharField(max_length=40)
    cpf = models.CharField(max_length=11, primary_key=True)
    email = models.EmailField()
    telefone = models.CharField(max_length=11) # Padrão brasileiro sem 0 na frente
    data_nascimento = models.DateField()
    endereco = models.OneToOneField(Endereco, on_delete=models.CASCADE, related_name='cliente')

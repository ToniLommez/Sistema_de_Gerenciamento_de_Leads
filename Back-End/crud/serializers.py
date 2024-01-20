from rest_framework import serializers
from .models import Cliente, Endereco

class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = '__all__'

class ClienteSerializer(serializers.ModelSerializer):
    endereco = EnderecoSerializer()

    class Meta:
        model = Cliente
        fields = '__all__'

    def create(self, validated_data):
        endereco_data = validated_data.pop('endereco')
        endereco = Endereco.objects.create(**endereco_data)
        cliente = Cliente.objects.create(endereco=endereco, **validated_data)
        return cliente

    def update(self, instance, validated_data):
        endereco_data = validated_data.pop('endereco')
        endereco = instance.endereco

        instance.nome = validated_data.get('nome', instance.nome)
        instance.email = validated_data.get('email', instance.email)
        instance.telefone = validated_data.get('telefone', instance.telefone)
        instance.data_nascimento = validated_data.get('data_nascimento', instance.data_nascimento)
        instance.save()

        endereco.cep = endereco_data.get('cep', endereco.cep)
        endereco.logradouro = endereco_data.get('logradouro', endereco.logradouro)
        endereco.complemento = endereco_data.get('complemento', endereco.complemento)
        endereco.bairro = endereco_data.get('bairro', endereco.bairro)
        endereco.cidade = endereco_data.get('cidade', endereco.cidade)
        endereco.estado = endereco_data.get('estado', endereco.estado)
        endereco.save()

        return instance

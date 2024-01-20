# Generated by Django 5.0.1 on 2024-01-15 01:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('nome', models.CharField(max_length=40)),
                ('cpf', models.CharField(max_length=11, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254)),
                ('telefone', models.CharField(max_length=15)),
                ('data_nascimento', models.DateField()),
                ('endereco_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Endereco',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('cep', models.CharField(max_length=8)),
                ('logradouro', models.CharField(max_length=80)),
                ('complemento', models.CharField(max_length=20)),
                ('bairro', models.CharField(max_length=29)),
                ('cidade', models.CharField(max_length=29)),
                ('estado', models.CharField(max_length=2)),
            ],
        ),
    ]

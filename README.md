# Sistema de Gerenciamento de Leads
Este repositório contém a API e o Front-End para um sistema de gerenciamento de leads de uma empresa. O projeto é dividido em duas partes principais: um Back-End construído em Python usando Django e um Front-End utilizando JavaScript vanilla, HTML e CSS.

# Back-End
## Tecnologias Utilizadas
* Python 3.12
* Django
* Django REST Framework
* Django-Cors-Headers

## Descrição
A API do Back-End segue o padrão RESTful, implementado com o Django e armazena dados em um banco de dados SQLite pré-populado com dados fictícios para teste.

## Instalação e Configuração
1. Instale as dependências necessárias:  
```pip install django djangorestframework django-cors-headers```

2. Navegue até o diretório do Back-End:  
```cd Back-End/```

3. Inicie o servidor localmente:  
```python manage.py runserver```

# Front-End

## Descrição
O Front-End é uma interface de usuário web simples, construída sem o uso de frameworks adicionais, exceto pelo Bootstrap para controle de grid e responsividade.

## Tecnologias Utilizadas
* HTML
* CSS
* JavaScript Vanilla
* Bootstrap 5.3.2

## Execução
Para visualizar o Front-End, abra o arquivo `Front-End/index.html` em um navegador web.

# Apresentação das funcionalidades da aplicação
Abaixo estão algumas capturas de tela da aplicação, destacando as diferentes funcionalidades e interfaces de usuário:

## Telas de Cadastro
- A aplicação é leve e simples, sendo uma unica tela principal contendo todos os leads paginados com uma barra de pesquisa para filtragem, a possibilidade de editar e criar novos leads e por fim contamos com um sistema de Dark-Mode embutido
![Completo Claro](Prints/completo_claro.png)
![Completo Escuro](Prints/completo_escuro.png)


- ![Cadastro Claro](Prints/cadastro_claro.png)

## Telas de Edição
- ![Editar Claro](Prints/editar_claro.png)

## Telas de Formulários
- ![Forms Largo](Prints/forms_largo.png)
- ![Forms Mobile](Prints/forms_mobile.png)
- ![Forms Tablet](Prints/forms_tablet.png)

## Telas de Pesquisa
- ![Sistema Pesquisa](Prints/sistema_pesquisa.png)
- ![Pesquisa](Prints/pesquisa.png)

## Telas Responsivas
- ![Viewport Mobile](Prints/viewport_mobile.png)
- ![Viewport Notebook](Prints/viewport_notebook.png)
- ![Viewport Tablet](Prints/viewport_tablet.png)

## Outras Telas
- ![Nuancias Forms](Prints/nuancias_forms.png)

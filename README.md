# Sistema_de_Gerenciamento_de_Leads
API e Front-End para sistema de gerenciamento de leads de uma empresa  
Construido utilizando o modelo de Back-End/API e Front-End

A api é construido em Python e o front utiliza javascript vanilla

# Back-End
O sistema é feito em Python 3.12 utilizando o framework Django  
Para a sua execução é necessario a instalação de 3 bibliotecas complementares entre si, sendo estas:  
Django, Django REST Framework e Django-Cors-Headers

A API utiliza um sistema RESTful com CRUD no padrão django,  
os dados são armazenados através de um banco de dados SQLite que já esta preenchido com alguns dados ficticios para teste do servidor

## Configurando o servidor
Para instalar as bibliotecas necessarias para rodar a aplicação basta utilizar os comandos:  
```pip install django```
```pip install djangorestframework```
```pip install django-cors-headers```

Após a instalação basta se direcionar ao diretorio:  
`Back-End/`  
Estando no diretorio para rodar o servidor localmente basta utilizar o comando:  
```python manage.py runserver```  

# Front-End
A parte visual da aplicação foi construida em HTML, CSS e Javascript sem ****nenhuma utilização de framework****  
Foi utilizada a biblioteca bootstrap _5.3.2_ para controle de grid e responsividade.

## Abrindo o Front-End
Devido a natureza simples da utilização do frontend sem framework para utiliza-lo basta abrir o arquivo `Front-End/index.html`

# Teste prático - Verzel

![Verzel](https://media.discordapp.net/attachments/1084170063726256132/1190758953261465610/home.png?ex=65a2f7b1&is=659082b1&hm=4607b324e94433bf1a658e32e5f754c9819e9d0e3c0cdbcf58058d048c7a37b0&=&format=webp&quality=lossless&width=938&height=467)

Neste repositório criei o front-end/back-end de uma página de catálogos com veículos a venda.

## 📖 Sobre o projeto

Foi utilizado as tecnologias que estavam listadas como obrigatórias, front-end desenvolvido em React.js e a API Rest em Python.

Neste teste, foi implementado as seguintes funcionalidades de acordo com os requisitos:

### Funcionalidades
- Carrega uma lista de veículos para venda.
- Cadastro e login de usuário.
- Veículos ordenados por preço.
- Utilizado token JWT para autenticar cada usuário.
- As requisições só funcionam se o token for validado.

## 🎨 Layout

Boa parte do layout foi inspirado no layout do site [Kavak](https://www.kavak.com/br/seminovos), utilizando o React juntamente com bibliotecas como o Axios e o SweetAlert2.

## ⚙️ Como executar o front-end

Para executar a aplicação localmente, siga os passos abaixo:

1. Clone este repositório:

```bash
  https://github.com/vinikrummenauer/car-app.git
  cd car-app

```

2. Instale as dependências

```bash
  npm install
```

3. Inicie a aplicação

```bash
  npm run dev
```

## ⚙️ Como executar o back-end

Você precisará ter o MySQL, XAMPP e o Python instalados no seu dispositivo.

1. Crie um banco de dados no MySQL:

```bash
  Crie um banco de dados MySQL e guarde o link para conectá-lo remotamente.
  
```

2. Crie as tabelas e insira os dados:

```bash
  Entre na pasta database depois de ter clonado o repositório e execute o script SQL no seu banco de dados recém criado.

```

3. Conecte seu banco de dados no script python:

```bash
  app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@127.0.0.1:3306/appreact'
  Nesta linhe coloque as credenciais do seu banco, o "appreact" é o nome do banco.

```

4. Instale as dependências necessárias:
```bash
  pip install Flask Flask-Cors SQLAlchemy Flask-JWT-Extended  
  Rode este comando no seu terminal.
```

5. Inicie a aplicação
```bash
  cd car-app
  py app.py

```

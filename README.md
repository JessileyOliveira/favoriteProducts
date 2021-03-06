# Produtos favoritos
> API para controle de lista de produtos favoritos de clientes.

## Instalação

Você deverá ter em sua máquina os seguinte itens:
- [Git](http://git-scm.com/) 
- [Node.js](http://nodejs.org/) 10.0.0 (ou superior)
- [Postgres](https://www.postgresql.org/download/) (Caso prefira poderá executá-lo através do [Docker](https://www.docker.com/) (docker-compose.yml))

1. Faça um Fork ou clone este repositório.

2. Instale as dependências do projeto:

   ```sh
   npm install
   ```

   ou se você usa yarn:

   ```sh
   yarn
   ```
   
3. Tenha o [Postgres](https://www.postgresql.org/) rodando em sua máquina com um database com nome `favoriteproducts` — ou execute o [Docker Compose](https://docs.docker.com/compose/) (neste caso o database será criado automaticamente):

   ```sh
   docker-compose up
   ```

   _Será executado o Postgres em sua máquina virtual docker na porta `5432`, isso pode ser alterado no arquivo `docker-compose.yml`._
   
 4. Crie um arquivo `.env` no diretório raiz, utilize o arquivo `.env-example` como padrão.
 
 5. Execute ```npx sequelize db:migrate``` (ou se você usa yarn ```yarn sequelize db:migrate```) para gerar as tabelas no database.
 
 ## Execução

Para início da aplicação, execute:

#### `Desenvolvimento `(com [nodemon](https://nodemon.io/)):
```sh 
npm run dev
```   

ou se você usa yarn:
```sh 
yarn dev
```

#### `Produção:`
```sh
npm run start
``` 

ou se você usa yarn:
```sh
yarn start
```

_Isso iniciará o servidor com base nos dados informados no arquivo `.env`, caso tenha seguido o exemplo iniciará em `localhost:3333`_

## Testes

_Os testes estão localizados na pasta `__tests__`._

Use o comando abaixo para executar os testes:

```sh
npm test
```

   ou se você usa yarn:

```sh
yarn test
```

_OBS:. A execução dos testes executa o script ```sequelize db:migrate```, criando as tabelas no database_

_OBS2:. A execução dos testes efetua a limpeza das tabelas ao final dos testes_

## Endpoints

### Autenticação

#### `POST`: `/authenticate`

Autentica o usuário e fornece um token jwt (este token será obrigatório em todos os próximos endpoints):

```json
{
  "username": "LuizaLabsUser",
  "password": "LuizaLabsPassword"
}
```

_O token deve ser enviado no header `Authorization` dos endpoints abaixo acompanhado da palavra `Baerer`, exemplo: `Bearer <token>`_
#

### Clientes

#### `GET`: `/customers?page=<NUMERO_DA_PAGINA>&perPage=<QUANTIDADE_POR_PAGINA>`

_OBS:. O parâmetro `page` e o parâmetro `perPage` são opcionais. Caso os mesmos não sejam fornecidos, serão utilizados os valores 1 e 10 respectivamente`_

`Ação:` Retorna uma lista de Clientes
#

#### `POST`: `/customers`

```json
{
  "name": "Jessiley Oliveira",
  "email": "jessiley@example.com.br"
}
```

`Ação:` Cadastra um novo cliente
#

#### `GET`: `/customers/<ID_CLIENTE>`

`Ação:` Retorna um cliente com base no ID
#

#### `PUT`: `/customers/<ID_CLIENTE>`

```json
{
  "name": "Jessiley Willian",
  "email": "jessiley@otherExample.com"
}
```

`Ação:` Atualiza os dados de um cliente
#

#### `DELETE`: `/customers/<ID_CLIENTE>`

`Ação:` Remove um cliente
#

### Produtos favoritos

OBS:. Os produtos não são gerenciados por este sistema, para ver a documentação da API de produtos [acesse](https://gist.github.com/Bgouveia/9e043a3eba439489a35e70d1b5ea08ec)

#### `POST`: `/customers/<ID_CLIENTE>/favoriteproduct/<ID_PRODUTO>`

`Ação:` Adiciona um produto a lista de favoritos do cliente
#

#### `GET`: `/customers/<ID_CLIENTE>/favoriteproduct?page=<NUMERO_DA_PAGINA>&perPage=<QUANTIDADE_POR_PAGINA>`

_OBS:. O parâmetro `page` e o parâmetro `perPage` são opcionais. Caso os mesmos não sejam fornecidos, serão utilizados os valores 1 e 10 respectivamente`_

`Ação:` Obtém a lista de produtos favoritos de um cliente
#

#### `DELETE`: `/customers/<ID_CLIENTE>/favoriteproduct/<ID_PRODUTO>`

`Ação:` Remove um produto da lista de favoritos de um cliente

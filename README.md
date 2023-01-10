# Consumo da API através do CEP de diferentes cidades
## Este é o projeto onde irei consumir uma API que trabalha atráves do CEP e gera as informações daquela determinada cidade

[![N|Solid](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/LogoCompasso-positivo.png/440px-LogoCompasso-positivo.png)](https://compass.uol/pt/home/)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/Jeef-Moreira)

Neste arquivo se encontra detalhado todo o experimento de como consumir uma API pública, neste caso, uma API que trabalha em gerar informações de determinada cidade atráves do seu CEP , iremos também adicionar uma imagem pelo container docker e mostrar as informações no back-end e no front-end de uma determinada porta. Será apresentado:
- Apresentação da API
- Ferramentas
- Bibliotecas Utilizadas
- ✨Comandos✨

## APRESENTAÇÃO DA API
API de Consulta: 
Iremos usar o Node.js para implementar a busca de endereços atualizados por cep diretamente no seu sistema de cadastro. Nossa API trabalha com um método simples e bem funcional para atender todas as necessidades de consulta. Basicamente a API retorna resultados no formato JSON, que pode ser interpretado por qualquer plataforma.
Neste tutorial, você consumirá uma API e rodar suas informações atráves de um CEP válido, utilizará o Docker para alocar a imagem da API e jogar tudo em uma determinada porta.


## FERRAMENTAS

As principais ferramentas utilizadas no projeto foram:

- [API de Consulta](https://cdn.apicep.com/file/apicep/06233-030.json/) - É uma API pública capaz de gerar informações como: cidade, estado, CEP e etc, isso sendo necessário só adicionar um CEP valido.

- [Docker Desktop v.4.15.0](https://www.docker.com/products/docker-desktop/) - É um ambiente para executar containers isolados nos sistemas Windows ou macOS, ao executar o mecanismo WSL 2, você pode executar contêineres do Linux e do Windows no Docker Desktop no mesmo computador.
- [Node JS v.16.14.2](https://nodejs.org/en/) - É uma plataforma de software para aplicativos escaláveis do lado do servidor e de rede. Os aplicativos Node.js são escritos em JavaScript e podem ser executados no tempo de execução Node.js no Mac OS X, Windows e Linux sem alterações.
- [Visual Studio Code v.1.73.1](https://code.visualstudio.com/) - O Visual Studio Code (VS Code) é um editor de código de código aberto desenvolvido pela Microsoft. Ele está disponível para Windows, Mac e Linux. É uma ferramenta criada pelo GitHub que permite a criação de softwares Desktop com HTML, CSS e JavaScript.

## BIBLIOTECAS UTILIZADAS
- Express: é um framework utilizado em conjunto com o Node. js. Ele possui características que facilitam o desenvolvimento de nossas aplicações web e APIs, como um sistema de rotas completo, tratamento de exceções, gerenciamento de requisições HTTP e muito mais.
- BodyParser: o body-parser é um módulo capaz de converter o body da requisição para vários formatos
- Nodemon: esse módulo é um utilitário que irá monitorar todas as alterações nos arquivos de sua aplicação e reiniciar automaticamente o servidor quando for necessário.
- Git/github: rodar os comandos do código, como criar o diretório, dependências e demais serviços executado no projeto e subir para o Github.

## Comandos

Busque uma API pública de sua preferência, no meu caso eu escolhi a API de CEP.
Para consumir uma API, primeiro você irá iniciar o projeto e instalar as suas dependências.

Crie um diretório para seu projeto no diretório inicial do usuário não root. O diretório se chamará ==teste-api==, mas você deve ficar à vontade para substituí-lo por outro:
* Abra seu prompt de comando ou algum aplicativo de tua escolha, como o Visual Studio Code, digite o comando abaixo para criar uma pasta.

```sh
mkdir <nome_da_pasta>
cd <nome_da_pasta>
```
Executando:
```sh
mkdir teste-api
cd teste-api
```
cd/teste-api: é a localização atual do teu projeto, você irá fazer toda configuração e execução do teu projeto dentro dela. Por isso, certifique que está localizado dentro da tua verdadeira pasta escolhida.

* Para acessar o diretório no VS Code, adicione o comando no prompt de comando:
```
code .
```

* Para iniciar o projeto do nó digite o seguinte comando.
```sh
npm init
```
O comando npm init é usado para criar um aplicativo Node. js projeto. O comando npm init criará um pacote onde os arquivos do projeto serão armazenados. Todos os módulos que você baixar serão armazenados no pacote.

Fazendo isto será adicionado o arquivo ==package.json== na tua pasta ./teste-api, este arquivo irá contém informações sobre nossos projetos, como scripts, dependências e versões. Ele pedirá o nome do pacote, a versão e muitos outros (você pode escolher os padrões pressionando ENTER).
* Para instalar as dependências do seu projeto, adicionando as bibliotecas express, nodemon e cors e axios, para isto execute o seguinte comando: 
```sh
npm i express nodemon body-parser
```
Quando o comando a seguir for usado com o npm install, ele salvará todos os pacotes principais instalados na seção de dependências do arquivo package. arquivo json.
Listando elas: 
O 'i' do comando abaixo é para instalar;
'express' é uma biblioteca que ajuda a criar a API;
'nodemon', ele fica observando a API enquanto é feito modificações nela. Ele é responsável por fazer o restart do servidor para o usuário;
'body-parser', é um módulo npm usado para processar dados enviados em um corpo de solicitação HTTP. Ele fornece quatro middleware expresso para analisar conjuntos de dados JSON, texto, codificados em URL e brutos em um corpo de solicitação HTTP.

Estamos adicionando explicitamente essas dependências ao nosso arquivo package.json para baixá-las quando executamos este aplicativo dentro de um contêiner do docker.
* Adicione um script à parte de scripts do arquivo package.json para executar o aplicativo com o nodemon. O conteúdo do arquivo será algo parecido com o seguinte:

==package.json==
```
{
  "name": "teste-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.2.1",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "nodemon": "^2.0.20"
  }
}
```

Obs.: lembre de substituir o parametro de =="test"== por =="start"== + nodemon <nome_da_aplicação.js>. No meu caso: =="start": "nodemon app.js"==. Isso é necessário para a execução do nodemon no nó da aplicação para sempre fazer o reset quando for feito uma nova alteração.

Feito a etapa anterior, abra o ==app.js== é visualize as rotas que foram criadas para acessar a API. No caso vou mostrar logo abaixo é detalhar um pouco sobre elas.
==app.js==
```
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '<link_html>')
});

app.listen('<porta_para_consumir_a_API')

app.post('/', async function (req, res) {
    const {data} = await axios(`<URL_da_API>${req.body.add}.json<${<modulos_para_consumo_da_API>}`)
    res.send(`<p>CEP: ${data.code}</p>
              <p>Cidade: ${data.city}</p>
              <p>Estado: ${data.state}</p>
              <p>Bairro: ${data.district}</p>
              <p> Endereço: ${data.address}</p>`);
    
    
});

```
* Agora, crie um arquivo chamado ==app.js== preenchendo todas as informações, ele deve ficar parecido como algo deste tipo:

==app.js==
```
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.listen('5001')

app.post('/', async function (req, res) {
    const {data} = await axios(`https://cdn.apicep.com/file/apicep/${req.body.add}.json`)
    res.send(`<p>CEP: ${data.code}</p>
              <p>Cidade: ${data.city}</p>
              <p>Estado: ${data.state}</p>
              <p>Bairro: ${data.district}</p>
              <p> Endereço: ${data.address}</p>`);
    
    
});

```
const é um qualificador de tipo que indica que os dados são somente leitura. Já a função require carrega o módulo express, que é usado para criar o aplicativo e os objetos. App.get carrega a API e o app.listen escuta e transmite pela porta adicionada (5001).

Para checar se tá tudo ok, adicione o comando abaixo:
```
node <nome_da_aplicação>, no meu caso-> node app.js
```
* Agora, crie um arquivo chamado ==index.html== da seguinte maneira.

==index.html==
```
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>TITULO</title>
    <h1> Titulo principal do conteúdo</h1>
    <h2>by: Autor</h2>
    <script src="<diretorio_da_API" defer></script>
</head>

<body>
    <form action="/" method="post">
        <h1>Insira um CEP válido para obter informações</h1>
        <p>EX: 06233-030</p>
        <input id="<nome_referencial_ID" name="<nome_referencial_variavel_para_consumir_API">
        <button type="submit">Nome_do_Botao</button>
    </form>
</body>

</html>
```

Já finalizado, você terá algo parecido com isso:
```
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>API CEP</title>
    <h1> API que gera informações atráves de um CEP válido</h1>
    <h2>by: Jefferson Moreira</h2>
    <script src="/script.js" defer></script>
</head>

<body>
    <form action="/" method="post">
        <h1>Insira um CEP válido para obter informações</h1>
        <p>EX: 06233-030</p>
        <input id="entrada" name="add">
        <button type="submit">Submit</button>
    </form>
</body>

</html>
```

Com a imagem Docker rodando a API no /localhost:5001, visualize que foram geradas informações no front-end com os dados do CEP adicionado pelo usuário, eu adicionei o CEP "63660-000", tais dados do back-end e front-end são:

code: '63660-000',
  state: 'CE',
  city: 'Tauá',
  district: '',
  address: '',
  status: 200,
  ok: true,
  statusText: 'ok'
  
Precisamos criar uma imagem fornecendo algumas informações como qual runtime precisamos, a porta que o aplicativo usará e os arquivos necessários que estão disponíveis em nosso sistema local.

* Crie um arquivo denominado Dockerfile, quando você nomea-lo perceba que irá aparecer uma baleia ao lado do nome, simbolo este pertecente ao Docker, copie todas as informações sobre a imagem que executará o aplicativo.

==Dockefile==
```
FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "start"]
```
EXPLICAÇÃO:
1- O FROM leva o nome da imagem.
2- WORKDIR informa o diretório que contém os arquivos do aplicativo no contêiner.
3- O comando COPY copia o arquivo package.json para o diretório do aplicativo.
4- O comando RUN executa o comando fornecido para instalar todas as dependências mencionadas no arquivo package.json.
5- Em seguida, COPY é usado para copiar o restante dos arquivos para o diretório do aplicativo no contêiner.
6- Por fim, fornecemos o script para executar o aplicativo.

* Finalmente, use este comando para construir a imagem que executaremos em nosso contêiner docker.
```
docker build . -t <nome_da_imagem> ou <ID_da_imagem>
```
Executando:
```
docker build . -t docker-container-api
```
O comando usa o sinalizador -t para especificar o nome da imagem, e então temos que fornecer onde a imagem estar situada.
* Confirme se a imagem foi criada atráves do comando:
```
docker images
```
Este comando irá lista todas as imagens baixadas no teu diretório.
* Para executar o docker container com esta imagem, use o seguinte comando.
```
docker run -d -p 8000:5001 /-v address_to_app_locally:/app docker-container-api
```
O comando acima executa um contêiner do docker. O sinalizador -p é usado para mapear a porta local 8000 para a porta 5001 do contêiner onde nosso aplicativo está sendo executado. O sinalizador -v é usado para montar nossos arquivos de aplicativo no diretório de aplicativo do contêiner. Ele também precisa do nome da imagem que queremos executar em nosso contêiner, que é, neste caso, docker-container-nodejs.

* Abra o navegador de tua preferência e entre com o endereço localhost:5001 , e nosso aplicativo expresso retornará a resposta executada.

CONCLUSÃO:
Neste artigo, aprendemos como consumir uma API, visualizar as informações dela no back-end e front-end, apresentação das principais ferramentas para executar uma imagem atráves de um contêiner docker. Após, aprendemos como criar uma imagem que será executada em um contêiner do docker. Por fim, consumimos uma API pública dentro da nosso aplicativo Express para demonstrar como executar um aplicativo usando Node.js em execução em um contêiner docker e ao consumo de uma API.
 

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dev]: <https://github.com/Jeef-Moreira>
   [learning]: <https://compassuol.udemy.com>
   [boss]: <https://compass.uol/pt/home>
   [node.js]: <http://nodejs.org>
   [API CEP]: <https://apicep.com/api-de-consulta/>
   [Docker Desktop]: <https://www.docker.com/products/docker-desktop>
   [Visual Studio Code]: <https://code.visualstudio.com>
  
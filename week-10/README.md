# Conteudo dia 2 Semana Omnistack - Week 10

## Arquitetura da aplicação - Dia 2

O backend da aplicação é responsável por controlar toda regra de negócio, conexão com banco de dados, envio de emails, comunicação com webservices e etc. Ele é o coração da aplicação, onde tudo funciona.

O frontend ele é um recebedor e interpretador dos dados. Usamos o JSON como forma de representar dados vindos do backend.

**yarn init -y** = indica que será criado um projeto JS com um arquivo *package.json*
**yarn add lib** = instala uma lib em dependecies. Para adicionar em devDependencies usamos *-D*

O node ele por si só não se atualiza a cada alteração, tendo que muitas das vezes ser parado e reiniciado para aplicar as alterações. Para isso existe uma dependência chamada **nodemon** que auxilia nesse processo mantendo o node ativo e a cada alteração ele se atualiza automaticamente.

Os *models* são representações de entidades da aplicação.

Os *utils* são estruturas ou métodos que podem ser usados sempre que precisamos criar algo ou executar algum tipo de formatação padrão na aplicação.

No Node.JS podemos usar o **async/await**, que nos permite que aguardemos as chamadas a métodos assíncronos antes de prosseguir. Podemos usar também para acesso ao banco de dados, trabalhos com arrays, funções, Promises e diversas outras coisas.

```js
routes.post('/devs', async (request, response) => {
    console.log('req POST', request.body);
    const { github_username, techs, latitude, longitude } = request.body;
    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

    // no caso de name, se não existir o valor padrão dele é o valor de 'login'
    const { name = login, avatar_url, bio } = apiResponse.data;

    const techsArray = techs.split(',').map(tech => tech.trim());

    const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
    };

    const dev = await Dev.create({
       github_username,
       name,
       bio,
       avatar_url,
       techs: techsArray,
       location,
    });

    return response.json(dev);
});
```

Como banco de dados usamos o MongoDB o qual é totalmente configurado na nuvem podendo ser acessado em [MongoDB Atlas](https://cloud.mongodb.com). E para conectar o Node.JS com o MongoDB devemos instalar uma dependência chamada **mongoose** que faz a ponte entre aplicação e banco de dados.

Para confiurar devemos importar a dependencia no arquivo principal e configurar a conexão

```js
const mongoose = require('mongoose');

// MongoDB: Banco de dados NÃO relacional
mongoose.connect('mongodb+srv://<nome-do-banco>:<senha-do-banco>@cluster0-xtssp.mongodb.net/<identificação>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

```

Depois de configurado podemos criar nossos Schemas que são as estruturas para criação da tabela onde serão salvos os dados inseridos. Importamos o mongoose e criamos uma instancia do Schema

```js
const schema = new mongoose.Schema({
    // estrutura a ser criada para salvar os dados
})
```

## Criando a interface 10 - Dia 3

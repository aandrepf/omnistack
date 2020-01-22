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

## Construindo a interface web - Dia 3

Desde meados de 2013 ouve-se uma abordadem no quesito de construção de interfaces chamada *SPA* que tem como significado single-page applications (aplicações em uma unica página). O que acontece nesse caso o HTML, CSS e o JS de interface, ficam do lado do browser onde o server não tem responsabilidade sobre essa parte. O front-end ele faz uma requisição para o back-end Node.JS e recebe uma resposta em formato JSON com os dados. Com esses dados o React.JS monta a interface sem necessidade de ficar recarregando a pagina e assim o mesmo pode ter várias interfaces (através de rotas). *Toda a estrutura HTML e CSS do front-end é gerada via Javascript!!!*.

Para criar um projeto react podemos usar a ferramenta criada pelo time do react via **yarn create react-app nome-do-projeto** ou sem o yarn com **npx create-react-app nome-do-projeto**.

O arquivo principal da aplicação em React.JS é o *src/index.js*

Todo arquivo Javascript que conter tags HTML dentro do mesmo entendemos como um JSX (Javascript + HTML) e nesse caso sempre devemos importar no arquivo js o React no mesmo.

Quando queremos que o React consiga ter a habilidade de trabalhar com a arvore de elementos do HTML (DOM), devemos importar o ReactDOM para tal. Para o desenvolvimento mobile usamos o ReactNative.

Quando queremos colocar mais de um componente um abaixo do outro, no React é necessário encapsular o mesmo em uma fragment (<></>) que é uma tag vazia usada como container.

```js
    // fragment
    <>
        <Header title="App 1"/>
        <Header title="App 2"/>
        <Header title="App 3"/>
    </>
```

Em React.JS temos 3 conceitos importantes:

**Component** = um bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação que retorna um conteudo HTML/CSS e algum JS para interface e sempre podem ser reutilizados. Por padrão começam sempre com letra Maiuscula.

**Property** = são informações que o componente PAI passa para o componente FILHO. Para ter acesso a propriedade no componente temos o parametro 'props' do componente, pois o mesmo é um método e então acessamos o valor via *props.nome-da-propriedade*.

**State** = são informações mantidas pelo componente via o conceito de *imutabilidade*.

**Imutabilidade JS** = nunca alterar um dado diretamente e sim criar um dado atraves do valor anterior

**Desestructuring JS** = é uma expressão JS que possibilita extrair dados de arrays ou objetos em variaveis distintas

```js
    var x = [1, 2, 3, 4, 5];
    var [y, z] = x;
    console.log(y); // 1
    console.log(z); // 2

    // com funções
    function f() {
        return [1, 2];
    }

    var a, b;
    [a, b] = f();
    console.log(a); // 1
    console.log(b); // 2
```

## Construindo o app Mobile - Dia 4

A abordagem do React Native é que usa-se Javascript, onde ele não é convertido em código nativo, e melhor o dispositivo entende JavaScript, via JavaScript Core, e a interface gerada é totalmente nativa.

**Expo** = seria um framework de desenvolvimento para React Native, onde o mesmo é um conjunto de libs e com ele, é possível utilizar a grande maioria de funcionalidades dos dispositivos móveis. Na Play Store podemos baixar o Expo.

A documentação do [Expo Docs](https://docs.expo.io);

Para instalar o Expo no ambiente de desenvolvimento usamos ou **yarn add global expo-cli** ou **npm install -g expo-cli**.

Se caso não houver a variavel de ambiente configurada basta procurar na doc do yarn na sessão cli pelo caminho da variavel de ambiente. Podemos ver os principais erros do expo em [Expo Common Issues](https://github.com/Rocketseat/expo-common-issues)

Para iniciar o projeto com expo executamos **expo init nome-projeto**. Depois de criado basta acessar a pasta e executar o script que inicia a aplicação. Ao subir ele abre no navegador um localhost na porta 19002 onde tem um qrCode que podemos scanear via app do Expo no celular e a aplicação estará pronta para ser desenvolvida.

No React Native não utilizamos HTML para construção da interface. Temos tags específicas como *View* que funciona como um container(div) uma tag *Text* para textos. Não temos as propriedades class e nem id para estilização e nesse caso usamos a classe *StyleSheet* do React Native que é um objeto. Suas propriedades usam formato camelCase quando a propriedade css tem hifen e não existe herança de formatação, ou seja, é um estilo pra cada tag.

### Navegação de pilha (react-navigation-stack)

Uma das navegações mais utilizadas em apps mobile é a navegação em pilha. Para usar devemos instalar na pasta do projeto a dependencia **react-navigation** que é a dependencia para navegações e em seguida instalar **react-navigation-stack @react-native-community/masked-view** que é a navegação em pilhas.

### Estruturando o app

Criamos uma pasta src onde ficara os arquivos das telas do app e o arquivo *routes.js* onde criamos as rotas da aplicação. Primeiramente devemos importar:

```js

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// telas do app
import Main from './pages/Main';
import Profile from './pages/Profile';

```

Feito isso criamos uma *const Routes*

```js

const Routes = createAppContainer(
    createStackNavigator({
      //Definimos as configurações das rotas
      Main: {
          screen: Main, // a tela
          navigationOptions: {
              //opções da navegação em Main como titulos e etc
          }
      }
    },{
        defaultNavigationOptions: {
            headerStyle: {
              backgroundColor: '#7d40e7'
            },
            headerTintColor: '#ffffff'
        },
    });
)

export default Routes;
```

Em App.js importamos as Routes e definimos a tag *Routes*;

## Funcionalidades Avançadas - Dia 5

Normalmente o Frontend faz uma requisição HTTP seja com GET, POST, PUT ou DELETE para o Backend e o mesmo manda uma resposta para o Frontend, mas se o Backend manda uma resposta ao Frontend sem que esse faça uma requisição ainda não existe esse formato a não ser que usemos o protocolo **Websocket**. Usamos um framework chamado **Socket.io** para utilizar o Websocket.

No backend instalamos o **socket.io** e no front-end **socket.io-client**

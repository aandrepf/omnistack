const express = require('express');
const mongoose = require('mongoose'); // Lib usada para conectar a aplicação com um banco de dados MongoDB
const routes = require('./routes');

const app = express();

// MongoDB: Banco de dados NÃO relacional
mongoose.connect('mongodb+srv://omnistack:@@dvlp2410@cluster0-xtssp.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use(express.json()); // Necessário para que se possa interpretar requisições com body JSON
app.use(routes); // Usando as rotas criadas no arquivo de rotas

app.listen(3333);
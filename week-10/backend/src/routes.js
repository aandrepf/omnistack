const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');

const routes = Router();

// Query params: request.query (Filtros, ordenação, paginação e etc.) GET
// Route Params: request.params (Idendifica um recurso na alteração ou remoção) PUT, DELETE
// Body: request.body (Dados para criação ou alteração de um registro) PUT, POST

// BUSCAR INFOS
routes.get('/', (request, response) => {
    console.log('request GET', request.query);
    return response.json({ message: 'Hello Omnistack Week 10' });
});

// ALTERAÇÃO DE UM USUARIO
routes.put('/users/:id', (request, response) => {
    console.log('request PUT', request.params);
});

// REMOÇÃO DE UM USUARIO
routes.delete('/users/:id', (request, response) => {
    console.log('request DELETE', request.params);
});

// CRIANDO UM USUARIO
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

    console.log(location);

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

module.exports = routes;
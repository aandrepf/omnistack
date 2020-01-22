const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Query params: request.query (Filtros, ordenação, paginação e etc.) GET
// Route Params: request.params (Idendifica um recurso na alteração ou remoção) PUT, DELETE
// Body: request.body (Dados para criação ou alteração de um registro) PUT, POST

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;
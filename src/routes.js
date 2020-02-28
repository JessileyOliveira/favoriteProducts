const { Router } = require('express');

const routes = new Router();

const CustomerController = require('./app/controllers/CustomerController');
const AuthenticateController = require('./app/controllers/AuthenticateController');

routes.post('/authenticate', AuthenticateController.store);
routes.post('/customers', CustomerController.store);
routes.get('/customers/:id', CustomerController.index);

module.exports = routes;

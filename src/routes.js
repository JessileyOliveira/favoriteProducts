const { Router } = require('express');

const routes = new Router();

const CustomerController = require('./app/controllers/CustomerController');
const AuthenticateController = require('./app/controllers/AuthenticateController');

routes.post('/customers', CustomerController.store);
routes.post('/authenticate', AuthenticateController.store);

module.exports = routes;

const { Router } = require('express');

const routes = new Router();

const CustomerController = require('./app/controllers/CustomerController');
const AuthenticateController = require('./app/controllers/AuthenticateController');

const auth = require('./app/middlewares/auth');
const getCustomer = require('./app/middlewares/getCustomer');

routes.post('/authenticate', AuthenticateController.store);
routes.post('/customers', CustomerController.store);

routes.use(auth);

routes.get('/customers', getCustomer, CustomerController.index);
routes.put('/customers', getCustomer, CustomerController.update);

module.exports = routes;

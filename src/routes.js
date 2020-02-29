const { Router } = require('express');

const routes = new Router();

const CustomerController = require('./app/controllers/CustomerController');
const AuthenticateController = require('./app/controllers/AuthenticateController');

const auth = require('./app/middlewares/auth');
const getCustomer = require('./app/middlewares/getCustomer');

routes.post('/authenticate', AuthenticateController.store);

routes.use(auth);

routes.post('/customers', CustomerController.store);
routes.get('/customers/:customer_id', getCustomer, CustomerController.index);
routes.put('/customers/:customer_id', getCustomer, CustomerController.update);
routes.delete(
  '/customers/:customer_id',
  getCustomer,
  CustomerController.destroy
);

module.exports = routes;

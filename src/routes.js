const { Router } = require('express');

const routes = new Router();

const CustomerController = require('./app/controllers/CustomerController');
const AuthenticateController = require('./app/controllers/AuthenticateController');
const CustomerFavoriteProductsController = require('./app/controllers/CustomerFavoriteProductsController');

const auth = require('./app/middlewares/auth');
const getCustomer = require('./app/middlewares/getCustomer');
const getProduct = require('./app/middlewares/getProduct');

routes.post('/authenticate', AuthenticateController.store);

routes.use(auth);

routes.get('/customers', CustomerController.index);
routes.post('/customers', CustomerController.store);
routes.get('/customers/:customer_id', getCustomer, CustomerController.show);
routes.put('/customers/:customer_id', getCustomer, CustomerController.update);
routes.delete(
  '/customers/:customer_id',
  getCustomer,
  CustomerController.destroy
);

routes.post(
  '/customers/:customer_id/favoriteproduct/:product_id',
  getCustomer,
  getProduct,
  CustomerFavoriteProductsController.store
);

routes.delete(
  '/customers/:customer_id/favoriteproduct/:product_id',
  getCustomer,
  getProduct,
  CustomerFavoriteProductsController.destroy
);

module.exports = routes;

const { Router } = require('express');

const routes = new Router();

routes.get('/', async (req, res) => {
  return res.json({ message: 'Hello World!!!' });
});

module.exports = routes;

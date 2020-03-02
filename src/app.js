require('dotenv/config');
const express = require('express');
const routes = require('./routes');
const helmet = require('helmet');
const cors = require('cors');
require('./database');
class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;

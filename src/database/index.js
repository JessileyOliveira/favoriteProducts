const Sequelize = require('sequelize');

const Customer = require('../app/models/Customer');

const databaseConfig = require('../config/database');

const models = [Customer];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

module.exports = new Database();

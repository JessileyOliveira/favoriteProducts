const Sequelize = require('sequelize');

const Customer = require('../app/models/Customer');
const CustomerFavoriteProducts = require('../app/models/CustomerFavoriteProducts');

const databaseConfig = require('../config/database');

const models = [Customer, CustomerFavoriteProducts];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();

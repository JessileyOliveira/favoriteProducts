const { Model, DataTypes } = require('sequelize');

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING
      },
      {
        sequelize
      }
    );
  }
}

module.exports = Customer;

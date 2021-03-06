const { Model, DataTypes } = require('sequelize');

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

module.exports = Customer;

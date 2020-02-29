const { Model, DataTypes } = require('sequelize');

class CustomerFavoriteProducts extends Model {
  static init(sequelize) {
    super.init(
      {
        customer_id: DataTypes.INTEGER,
        product_id: DataTypes.UUID,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

module.exports = CustomerFavoriteProducts;

const { Model, DataTypes } = require('sequelize');

class CustomerFavoriteProducts extends Model {
  static init(sequelize) {
    super.init(
      {
        customer_id: DataTypes.INTEGER,
        product_id: DataTypes.UUID,
        product_title: DataTypes.STRING,
        product_image: DataTypes.STRING,
        product_price: DataTypes.DECIMAL(10, 2),
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

module.exports = CustomerFavoriteProducts;

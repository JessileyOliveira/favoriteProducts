const CustomerFavoriteProducts = require('../../app/models/CustomerFavoriteProducts');

class CustomerFavoriteProductsController {
  async store(req, res) {
    const customer = req.customer;
    const product = req.product;

    const checkProductAlreadyExists = await CustomerFavoriteProducts.findOne({
      where: { customer_id: customer.id, product_id: product.id },
    });

    if (checkProductAlreadyExists) {
      return res
        .status(400)
        .json({
          error: true,
          message: 'The product already exists on the customers favorite list!',
        });
    }

    const favoriteProduct = await CustomerFavoriteProducts.create({
      customer_id: customer.id,
      product_id: product.id,
    });
    res.status(201).json(favoriteProduct);
  }
}

module.exports = new CustomerFavoriteProductsController();

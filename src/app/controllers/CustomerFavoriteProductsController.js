const CustomerFavoriteProducts = require('../../app/models/CustomerFavoriteProducts');

class CustomerFavoriteProductsController {
  async store(req, res) {
    const customer = req.customer;
    const product = req.product;

    const checkProductAlreadyExists = await CustomerFavoriteProducts.findOne({
      where: { customer_id: customer.id, product_id: product.id },
    });

    if (checkProductAlreadyExists) {
      return res.status(400).json({
        error: true,
        message: 'The product already exists on the customers favorite list!',
      });
    }

    const favoriteProduct = await CustomerFavoriteProducts.create({
      customer_id: customer.id,
      product_id: product.id,
      product_title: product.title,
      product_image: product.image,
      product_price: product.price,
    });
    return res.status(201).json(favoriteProduct);
  }

  async destroy(req, res) {
    const customer = req.customer;
    const product = req.product;

    await CustomerFavoriteProducts.destroy({
      where: { customer_id: customer.id, product_id: product.id },
    });

    return res.status(200).send();
  }

  async show(req, res) {
    const customer = req.customer;
    const { page = 1, perPage = 10 } = req.query;
    const favoriteProducts = await CustomerFavoriteProducts.findAll({
      where: { customer_id: customer.id },
      order: ['product_title'],
      limit: perPage,
      offest: (page - 1) * perPage,
    });

    const total = await CustomerFavoriteProducts.count({
      where: { customer_id: customer.id },
      col: 'id',
    });

    const content = {
      total,
      perPage,
      lastPage: Math.round(total / perPage),
      page,
      data: favoriteProducts,
    };

    return res.status(200).json(content);
  }
}

module.exports = new CustomerFavoriteProductsController();

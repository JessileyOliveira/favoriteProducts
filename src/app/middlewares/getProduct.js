const apiProduct = require('../services/apiProduct');

module.exports = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const { data } = await apiProduct.get(`/api/product/${product_id}`);
    req.product = data;
  } catch (e) {
    return res.status(404).json({ error: true, message: 'Product not found!' });
  }

  next();
};

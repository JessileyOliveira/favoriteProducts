const Customer = require('../models/Customer');

module.exports = async (req, res, next) => {
  const { customer_id } = req.params;

  const customer = await Customer.findByPk(customer_id);

  if (!customer) {
    return res
      .status(404)
      .json({ error: true, message: 'Customer not found!' });
  }

  req.customer = customer;

  next();
};

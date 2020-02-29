const Customer = require('../models/Customer');

module.exports = async (req, res, next) => {
  const id = req.requesterId;

  const customer = await Customer.findByPk(id);

  if (!customer) {
    return res
      .status(404)
      .json({ error: true, message: 'Customer not found!' });
  }

  req.customer = customer;

  next();
};

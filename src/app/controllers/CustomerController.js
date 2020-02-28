const Customer = require('../models/Customer');

class CustomerController {
  async index(req, res) {
    const { id } = req.params;

    if (!Number.isInteger(parseInt(id))) {
      return res
        .status(400)
        .json({ error: true, message: 'Sent ID is invalid!' });
    }

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res
        .status(404)
        .json({ error: true, message: 'Customer not found!' });
    }

    return res.status(200).json(customer);
  }

  async store(req, res) {
    const { email } = req.body;
    try {
      const checkEmailExist = await Customer.findOne({ where: { email } });

      if (checkEmailExist) {
        return res
          .status(400)
          .json({ error: true, message: 'Duplicated email' });
      }

      const customer = await Customer.create(req.body);

      return res.status(201).json(customer);
    } catch (e) {
      return res
        .status(400)
        .json({ error: true, message: 'Error registering customer' });
    }
  }
}

module.exports = new CustomerController();

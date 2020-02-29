const Customer = require('../models/Customer');
const { Op } = require('sequelize');

class CustomerController {
  async index(req, res) {
    const customer = req.customer;

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

  async update(req, res) {
    const customer = req.customer;
    const { email } = req.body;

    const checkEmailExist = await Customer.findOne({
      where: { email, id: { [Op.not]: customer.id } },
    });

    if (checkEmailExist) {
      return res.status(400).json({ error: true, message: 'Duplicated email' });
    }

    const { name } = await customer.update(req.body);

    return res.status(200).json({ name, email });
  }

  async destroy(req, res) {
    const customer = req.customer;

    await customer.destroy();

    return res.status(200).send();
  }
}

module.exports = new CustomerController();

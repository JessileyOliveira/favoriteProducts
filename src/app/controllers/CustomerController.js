const Customer = require('../models/Customer');
const { Op } = require('sequelize');

class CustomerController {
  async index(req, res) {
    const { page = 1, perPage = 10 } = req.query;
    const customers = await Customer.findAll({
      order: ['name'],
      limit: perPage,
      offest: (page - 1) * perPage,
    });

    const total = await Customer.count({ col: 'id' });

    const content = {
      total,
      perPage,
      lastPage: Math.round(total / perPage),
      page,
      data: customers,
    };

    return res.status(200).json(content);
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

  async show(req, res) {
    const customer = req.customer;

    return res.status(200).json(customer);
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

const Customer = require('../models/Customer');

class CustomerController {
  async store(req, res) {
    try {
      const { email, name } = req.body;
      const checkEmailExist = await Customer.findOne({ where: { email } });

      if (checkEmailExist) {
        return res
          .status(400)
          .json({ error: true, message: 'Duplicated email' });
      }

      const customer = await Customer.create(req.body);

      return res.status(201).json(customer);
    } catch (e) {
      if (!email || !name) {
        return res
          .status(400)
          .json({ error: true, message: 'Name and email are required' });
      }
    }
  }
}

module.exports = new CustomerController();

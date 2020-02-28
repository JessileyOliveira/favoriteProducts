const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

class AuthenticateController {
  async store(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: true,
        message: `Email not informed!`,
      });
    }

    const customer = await Customer.findOne({ where: { email } });

    if (!customer) {
      return res.status(404).json({
        error: true,
        message: `Customer not exists with email ${email}!`,
      });
    }

    const { id } = customer;

    return res.status(200).json({
      token: jwt.sign({ id, email }, '37bd1ee46cb74652c48a54f43c0e0c8c', {
        expiresIn: '30d',
      }),
    });
  }
}

module.exports = new AuthenticateController();

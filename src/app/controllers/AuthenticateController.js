const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

class AuthenticateController {
  async store(req, res) {
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).json({
        error: true,
        message: `Username not informed!`,
      });
    }

    if (!password) {
      return res.status(400).json({
        error: true,
        message: `Password not informed!`,
      });
    }

    if (username === 'LuizaLabsUser' && password === 'LuizaLabsPassword') {
      const token = jwt.sign(
        {
          username,
          password,
        },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      );

      return res.status(200).send({ token });
    }

    return res.status(404).send({ error: 'User not found!' });
  }
}

module.exports = new AuthenticateController();

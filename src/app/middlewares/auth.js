const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res
      .status(401)
      .json({ error: true, message: 'Token not provided!' });
  }

  const token = auth.split(' ')[1];

  try {
    await promisify(jwt.verify)(token, authConfig.secret);

    return next();
  } catch (e) {
    return res.status(401).json({ error: true, message: 'Invalid token!' });
  }
};

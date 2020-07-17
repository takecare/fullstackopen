const jwt = require('jsonwebtoken');
const config = require('./config');

const verify = (token, secret = config.jwtSecret) => {
  return jwt.verify(token, secret);
};

module.exports = { verify };

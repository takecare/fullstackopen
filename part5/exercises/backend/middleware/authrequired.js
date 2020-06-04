const jwt = require("jsonwebtoken");
const config = require("../utils/config");

/* eslint-disable require-atomic-updates */
const authorizationRequired = async (req, _res, next) => {
  const decoded = await jwt.verify(req.token, config.jwtSecret);
  req.user = {
    username: decoded.username,
    id: decoded.id,
  };

  next();
};

module.exports = authorizationRequired;

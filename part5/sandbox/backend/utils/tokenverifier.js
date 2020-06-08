const jwt = require("jsonwebtoken");
const config = require("./config");

// const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

const verify = (token, secret = config.jwtSecret) => {
  return jwt.verify(token, secret);
};

module.exports = { verify };

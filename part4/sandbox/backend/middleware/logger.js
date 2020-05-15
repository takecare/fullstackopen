const util = require("util");

const logger = (req, res, next) => {
  console.log(`> ${req.method} ${req.baseUrl} ${req.path}`);
  console.log(`> params: ${util.inspect(req.params)}`);
  console.log(`> headers: ${util.inspect(req.headers)}`);
  console.log(`> body: ${util.inspect(req.body)}`);
  next();
};

module.exports = logger;

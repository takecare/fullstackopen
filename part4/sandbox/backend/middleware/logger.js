const util = require("util");
const log = require("../utils/logger");

const logger = (req, res, next) => {
  log.info(`> ${req.method} ${req.baseUrl} ${req.path}`);
  log.info(`> params: ${util.inspect(req.params)}`);
  log.info(`> headers: ${util.inspect(req.headers)}`);
  log.info(`> body: ${util.inspect(req.body)}`);
  next();
};

module.exports = logger;

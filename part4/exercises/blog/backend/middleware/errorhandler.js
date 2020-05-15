const logger = require("../utils/logger");

const handler = (error, req, res, next) => {
  logger.error(error);

  // TODO

  next(error);
};

module.exports = handler;

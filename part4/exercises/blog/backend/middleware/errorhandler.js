const logger = require("../utils/logger");

const handler = (error, req, res, next) => {
  logger.error(error);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  } else if (error.name === "NotFound") {
    return res.status(404).send({ error: "Not found" });
  }

  next(error);
};

module.exports = handler;

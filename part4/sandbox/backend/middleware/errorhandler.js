const logger = require("../utils/logger");

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  } else if (error.name === "UserNotFound") {
    return res.status(400).send({ error: "User not found" });
  } else if (error.name === "NotFound") {
    return res.status(404).send({ error: "Not found" });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  }

  next(error);
};

module.exports = errorHandler;

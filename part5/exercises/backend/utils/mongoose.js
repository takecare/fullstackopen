const mongoose = require("mongoose");
const config = require("./config");
const logger = require("./logger");

const connect = () =>
  mongoose
    .connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => logger.info("> MongoDB connected: ", config.mongoUri))
    .catch((error) => logger.error("> MongoDB failed to connect: ", error));

module.exports = {
  connect,
};

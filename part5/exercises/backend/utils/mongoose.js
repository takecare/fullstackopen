const mongoose = require("mongoose");
const config = require("./config");
const logger = require("./logger");

const connect = () =>
  mongoose
    .connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => logger.info("MongoDB connected."))
    .catch((error) => logger.error("MongoDB failed to connect: ", error));

module.exports = {
  connect,
};

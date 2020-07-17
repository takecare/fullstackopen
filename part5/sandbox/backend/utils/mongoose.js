const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

const connect = () =>
  mongoose
    .connect(config.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      logger.info('Connected to MongoDB');
    })
    .catch((error) => {
      logger.error('Error connecting to MongoDB:', error.message);
    });

module.exports = {
  connect,
};

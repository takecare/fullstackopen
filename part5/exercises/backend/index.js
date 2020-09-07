const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);
server.listen(config.port, () => {
  logger.info(`> Server listening on port ${config.port}`);
});

const shutdown = () => {
  server.close(() => {
    mongoose.connection.close(false, () => process.exit(0));
  });
};

process.on("SIGINT", shutdown);
process.on("SIGQUIT", shutdown);
process.on("SIGTERM", shutdown);

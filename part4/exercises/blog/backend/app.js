const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const errorhandler = require("./middleware/errorhandler");
const requestlogger = require("./middleware/logger");
const cors = require("./middleware/cors");
const blogsRouter = require("./controllers/blogs");

const app = express();

app.use(express.json());
app.use(requestlogger);
app.use(errorhandler);
app.use(cors);

// TODO unhandled endpoing middleware

app.use("/api/blogs", blogsRouter);

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info("MongoDB connected."))
  .catch((error) => logger.error("MongoDB failed to connect: ", error));

module.exports = app;

const express = require("express");
require("express-async-errors");
const mongoose = require("./utils/mongoose");
const requestlogger = require("./middleware/logger");
const cors = require("./middleware/cors");
const errorhandler = require("./middleware/errorhandler");
const unsupported = require("./middleware/unsupportedendpoint");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const config = require("./utils/config");

const app = express();

app.use(express.json());
app.use(requestlogger);
app.use(cors);

if (config.isTestEnv) {
  const testRouter = require("./controllers/test");
  app.use("/api/test", testRouter);
}

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(errorhandler);
app.use(unsupported);

mongoose.connect();

module.exports = app;

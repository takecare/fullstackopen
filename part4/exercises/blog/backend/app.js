const express = require("express");
require("express-async-errors");
const mongoose = require("./utils/mongoose");
const errorhandler = require("./middleware/errorhandler");
const requestlogger = require("./middleware/logger");
const cors = require("./middleware/cors");
const auth = require("./middleware/auth");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const app = express();

app.use(express.json());
app.use(requestlogger);
app.use(cors);
app.use(auth);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(errorhandler);
// TODO unhandled endpoint middleware

mongoose.connect();

module.exports = app;

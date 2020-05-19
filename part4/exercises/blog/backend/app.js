const express = require("express");
require("express-async-errors");
const mongoose = require("./utils/mongoose");
const errorhandler = require("./middleware/errorhandler");
const requestlogger = require("./middleware/logger");
const cors = require("./middleware/cors");
const blogsRouter = require("./controllers/blogs");

const app = express();

app.use(express.json());
app.use(requestlogger);
app.use(cors);

app.use("/api/blogs", blogsRouter);

app.use(errorhandler);
// TODO unhandled endpoint middleware

mongoose.connect();

module.exports = app;

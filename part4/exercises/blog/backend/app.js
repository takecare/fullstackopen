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
app.use(errorhandler);
app.use(cors);

// TODO unhandled endpoint middleware

app.use("/api/blogs", blogsRouter);

mongoose.connect();

module.exports = app;

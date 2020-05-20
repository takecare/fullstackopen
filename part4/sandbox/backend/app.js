const express = require("express");
const logger = require("./middleware/logger");
const cors = require("./middleware/cors");
const errorHandler = require("./middleware/errorhandler");
const unsupportedEndpoint = require("./middleware/unsupportedendpoint");
const mongoose = require("./utils/mongoose");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");

mongoose.connect();

const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(logger);
app.use(cors);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

app.use(unsupportedEndpoint);
app.use(errorHandler);

module.exports = app;

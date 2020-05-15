const express = require("express");
const logger = require("./middleware/logger");
const cors = require("./middleware/cors");
const errorHandler = require("./middleware/errorhandler");
const unsupportedEndpoint = require("./middleware/unsupportedendpoint");
const mongoose = require("./utils/mongoose");
const notesRouter = require("./controllers/notes");

mongoose.connect();

const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(logger);
app.use(cors);

app.use("/api/persons", notesRouter);

app.use(unsupportedEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

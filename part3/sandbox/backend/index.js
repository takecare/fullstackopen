const express = require("express");
const logger = require("./middleware/logger");
const cors = require("./middleware/cors");
const errorHandler = require("./middleware/errorhandler");
const unsupportedEndpoint = require("./middleware/unsupportedendpoint");
const mongoose = require("mongoose");
const Note = require("./models/note");

const app = express();

require("dotenv").config();
const password = process.env.MONGODB_PW;
const mongoUrl = process.env.MONGODB_URI.replace("<password>", password);

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

app.use(express.static("build"));
app.use(express.json());
app.use(logger);
app.use(cors);

app.get("/api/notes", (req, res, next) => {
  Note.find({}).then((notes) => res.json(notes));
});

app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        return res.json(note.toJSON());
      } else {
        throw { error: "NotFound" };
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).send())
    .catch((error) => next(error));
});

app.post("/api/notes", (req, res, next) => {
  const newNote = new Note({
    important: false,
    ...req.body,
    date: new Date(),
  });

  newNote
    .save()
    .then((result) => res.status(201).send(newNote.toJSON()))
    .catch((error) => res.status(500).send(error));
});

app.put("/api/notes/:id", (req, res, next) => {
  const updateNote = {
    content: req.body.content,
    important: req.body.important,
  };
  Note.findByIdAndUpdate(req.params.id, updateNote, { new: true })
    .then((result) => {
      if (result) {
        return res.json(result.toJSON());
      } else {
        throw { name: "NotFound" };
      }
    })
    .catch((error) => next(error));
});

app.use(unsupportedEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

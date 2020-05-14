const express = require("express");
const logger = require("./middleware/logger");
const cors = require("./middleware/cors");
const mongoose = require("mongoose");
const Note = require("./models/note");

const app = express();

require("dotenv").config();
const password = process.env.MONGODB_PW;
const mongoUrl = process.env.MONGODB_URI.replace("<password>", password);

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

app.use(express.json());
app.use(logger);
app.use(cors);

app.use(express.static("build"));

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => res.json(notes));
});

app.get("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  Note.findById(req.params.id)
    .then((note) => res.json(note.toJSON()))
    .catch((error) => res.status(404).send(error));
});

app.delete("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newNotes = notes.filter((note) => note.id !== id);
  if (newNotes.length !== notes.length) {
    notes = newNotes;
    res.status(204).end();
  } else {
    res.status(404).send("Not found.");
  }
});

app.post("/api/notes", (req, res) => {
  const note = req.body;

  const newNote = new Note({
    date: new Date(),
    important: false,
    ...note,
  });

  newNote
    .save()
    .then((result) => res.status(201).send(newNote.toJSON()))
    .catch((error) => res.status(500).send(error));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

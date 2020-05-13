const express = require("express");
const util = require("util");
const app = express();

app.use(express.json());

const logger = (req, res, next) => {
  console.log(`> ${req.method} ${req.baseUrl} ${req.path}`);
  console.log(`> params: ${util.inspect(req.params)}`);
  console.log(`> headers: ${util.inspect(req.headers)}`);
  next();
};
app.use(logger);

// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

let maxId = 0;
const findMaxId = () =>
  notes.forEach((note) => {
    if (note.id > maxId) {
      maxId = note.id;
    }
  });

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).send("Not found.");
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newNotes = notes.filter((note) => note.id !== id);
  if (newNotes.length !== notes.length) {
    notes = newNotes;
    if (id === maxId) {
      findMaxId();
    }
    res.status(204).end();
  } else {
    res.status(404).send("Not found.");
  }
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  if (!note.content) {
    res.status(400).send(`"content" property is missing`);
    return;
  }

  const newNote = {
    id: ++maxId,
    date: new Date(),
    important: false,
    ...note,
  };
  notes = notes.concat(newNote);
  res.status(201).send(newNote);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  findMaxId();
  console.log(`Server running on port ${port}`);
});

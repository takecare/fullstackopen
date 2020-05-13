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

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

let maxId = 0;
const updateMaxId = () =>
  persons.forEach((person) => (person.id > maxId ? (maxId = person.id) : null));

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send("Not found.");
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newPersons = persons.filter((person) => person.id !== id);
  if (newPersons.length !== persons.length) {
    persons = newPersons;
    if (id === maxId) {
      updateMaxId();
    }
    res.status(204).end();
  } else {
    res.status(404).send("Not found.");
  }
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (!person.name || !person.number) {
    res.status(400).send(`Both "name" and "number" properties are mandatory!`);
    return;
  }

  const newPerson = { id: ++maxId, ...person };
  persons = persons.concat(newPerson);
  res.status(201).send(newPerson);
});

const port = 3001;
app.listen(port, () => {
  updateMaxId();
  console.log(`Server running on port ${port}`);
});

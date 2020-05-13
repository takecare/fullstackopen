const express = require("express");
const util = require("util");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

const logger = (req, res, next) => {
  console.log(`> ${req.method} ${req.baseUrl} ${req.path}`);
  console.log(`> params: ${util.inspect(req.params)}`);
  console.log(`> headers: ${util.inspect(req.headers)}`);
  console.log(`> body: ${util.inspect(req.body)}`);
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
    res.status(404).send(`Entry with id "${id}" not found.`);
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

  const foundPerson = persons.find((p) => p.name === person.name);
  if (foundPerson) {
    res
      .status(400)
      .send(`"name" must be unique. "${person.name}" already exists.`);
    return;
  }

  const newPerson = { id: parseInt(`${Math.random()}`.slice(2)), ...person };
  persons = persons.concat(newPerson);
  res.status(201).send(newPerson);
});

app.get("/info", (req, res) => {
  res.send(`Phonebook has ${persons.length} people, as of ${new Date()}`);
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: `Unsupported endpoint: "${req.path}"` });
};
app.use(unknownEndpoint);

const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

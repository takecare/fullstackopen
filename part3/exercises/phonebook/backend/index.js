const express = require("express");
const util = require("util");
const morgan = require("morgan");
const cors = require("./middleware/cors");
const mongoose = require("mongoose");
const Person = require("./models/person");

require("dotenv").config();
const password = process.env.MONGODB_PW;
const mongoUrl = process.env.MONGODB_URI.replace("<password>", password);
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error.message));

const app = express();
app.use(express.json());
app.use(cors);

morgan.token("body", (req) => util.inspect(req.body));
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      tokens.body(req),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

app.use(express.static("build"));

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((people) => res.json(people.map((person) => person.toJSON())))
    .catch((error) => res.status(500).send(error));
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => res.json(person.toJSON()))
    .catch((error) => res.status(500).send(error));
});

app.delete("/api/persons/:id", (req, res) => {
  Person.deleteOne({ _id: req.params.id })
    .then((result) => res.status(204).end())
    .catch((error) => res.status(500).send(error));
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  Person.find({ name: person.name })
    .then((result) => {
      if (result.length !== 0) {
        throw `${person.name} already exists.`;
      }
      return result;
    })
    .then(() => new Person(person).save())
    .then((result) => res.status(201).send(result.toJSON()))
    .catch((error) => res.status(500).send(error));
});

app.get("/info", (req, res) => {
  res.send(`Phonebook has ${persons.length} people, as of ${new Date()}`);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

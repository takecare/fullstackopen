const express = require("express");
const morgan = require("./middleware/morgan");
const logger = require("./middleware/logger");
const cors = require("./middleware/cors");
const errorHandler = require("./middleware/errorhandler");
const unsupportedEndpoint = require("./middleware/unsupportedendpoint");
const mongooseWrapper = require("./database/mongoose");
const Person = require("./models/person");
const Error = require("./models/error");

mongooseWrapper.connect();

const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(logger);
app.use(morgan);
app.use(cors);

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((people) => res.json(people.map((person) => person.toJSON())))
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.json(result.toJSON());
      } else {
        throw new Error("NotFound", `Id "${req.params.id}" not found.`);
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.deleteOne({ _id: req.params.id })
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const person = req.body;
  Person.find({ name: person.name })
    .then(() => new Person(person).save())
    .then((result) => res.status(201).send(result.toJSON()))
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  // https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
  // https://github.com/blakehaswell/mongoose-unique-validator#readme
  Person.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((result) => {
      if (result) {
        res.status(200).send(result.toJSON());
      } else {
        throw new Error("NotFound", `Id "${req.params.id}" not found.`);
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res, next) => {
  Person.find({})
    .then((people) =>
      res.send(`Phonebook has ${people.length} people, as of ${new Date()}.`)
    )
    .catch((error) => next(error));
});

app.use(unsupportedEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

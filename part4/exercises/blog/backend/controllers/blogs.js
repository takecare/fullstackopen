const express = require("express");
const Model = require("../models/blog");

const router = express.Router();

router.get("/", (req, res, next) => {
  Model.find({})
    .then((result) => res.send(result.map((item) => item.toJSON())))
    .catch((error) => next(error));
});

router.post("/", (req, res, next) => {
  const blog = req.body;
  Model.create(blog)
    .then((result) => res.status(201).send(result.toJSON()))
    .catch((error) => next(error));
});

module.exports = router;

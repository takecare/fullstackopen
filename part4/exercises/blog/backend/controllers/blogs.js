const express = require("express");
const Model = require("../models/blog");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await Model.find({});
  res.send(result.map((item) => item.toJSON()));
});

router.post("/", async (req, res, next) => {
  const blog = req.body;
  const result = await Model.create(blog);
  res.status(201).send(result.toJSON());
});

module.exports = router;

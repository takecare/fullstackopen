const express = require("express");
const Model = require("../models/blog");

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Model.find({});
  res.send(result.map((item) => item.toJSON()));
});

router.post("/", async (req, res) => {
  const blog = req.body;
  const result = await Model.create(blog);
  res.status(201).send(result.toJSON());
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Model.deleteOne({ _id: id });
  res.status(204).end();
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await Model.findOneAndUpdate({ _id: id }, data, { new: true });
  res.status(200).send(result.toJSON());
});

module.exports = router;

const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Blog.find({}).populate("user", {
    username: 1,
    id: 1,
    name: 1,
  });
  res.send(result.map((item) => item.toJSON()));
});

router.post("/", async (req, res) => {
  const users = await User.find({});
  const user = users[Math.floor(Math.random() * Math.floor(users.length))];

  const blog = {
    ...req.body,
    user: user._id,
  };

  const result = await Blog.create(blog);
  res.status(201).send(result.toJSON());
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Blog.deleteOne({ _id: id });
  res.status(204).end();
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await Blog.findOneAndUpdate({ _id: id }, data, { new: true });
  res.status(200).send(result.toJSON());
});

module.exports = router;

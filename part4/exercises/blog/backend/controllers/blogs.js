const express = require("express");
const auth = require("../middleware/auth");
const authrequired = require("../middleware/authrequired");
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

router.post("/", auth);
router.post("/", authrequired);
router.post("/", async (req, res) => {
  const blog = {
    ...req.body,
    user: req.user.id,
  };

  const result = await Blog.create(blog);
  res.status(201).send(result.toJSON());
});

router.delete("/:id", auth);
router.delete("/:id", authrequired);
router.delete("/:id", async (req, res) => {
  const userId = req.user.id;
  const blogId = req.params.id;

  const result = await Blog.findOne({ _id: blogId });
  const blog = result.toJSON();
  if (blog.user != userId) {
    throw {
      name: "Unauthorized",
      message: "Insufficient permissions.",
    };
  }

  await Blog.deleteOne({ _id: blogId });
  res.status(204).end();
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await Blog.findOneAndUpdate({ _id: id }, data, { new: true });
  res.status(200).send(result.toJSON());
});

module.exports = router;

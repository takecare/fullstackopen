const express = require("express");
const auth = require("../middleware/auth");
const authrequired = require("../middleware/authrequired");
const Blog = require("../models/blog");
const User = require("../models/user");
const router = express.Router();

const populateUserOpts = {
  username: 1,
  id: 1,
  name: 1,
};

router.get("/", async (req, res) => {
  const result = await Blog.find({}).populate("user", populateUserOpts);
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

  const user = await User.findOne({ _id: req.user.id });
  user.blogs = user.blogs.concat(result._id);
  await user.save();

  // cannot find a way of using populateUserOpts (even after reading docs):
  const newBlog = await result.populate("user").execPopulate();

  res.status(201).send(newBlog.toJSON());
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

router.put("/:id", auth);
router.put("/:id", authrequired);
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = { likes: req.body.likes };
  const result = await Blog.findOneAndUpdate({ _id: id }, data, { new: true }).populate("user", {
    username: 1,
    id: 1,
    name: 1,
  });
  res.status(200).send(result.toJSON());
});

module.exports = router;

const express = require("express");
const router = express.Router();
const passwordHasher = require("../utils/passwordhasher")(require("bcrypt"));
const User = require("../models/user");
const Blog = require("../models/blog");

router.post("/clear", async (req, res, next) => {
  try {
    await User.deleteMany({});
    await Blog.deleteMany({});
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

router.post("/populate", async (req, res, next) => {
  try {
    const user = await User.create({
      name: "testinho",
      username: "test",
      passwordHash: await passwordHasher("password"),
      blogs: [],
    });

    const blog = await Blog.create({
      title: "title",
      author: "author",
      url: "https://www.blog.pt",
      user: user._id,
    });

    user.blogs = [blog];
    await user.save();

    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;

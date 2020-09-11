const express = require("express");
const router = express.Router();
const hashPassword = require("../utils/passwordhasher")(require("bcrypt"));
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
    const username = req.body.username || "test";
    const password = req.body.password || "password";

    const user = await User.create({
      name: "testinho",
      username: username,
      passwordHash: await hashPassword(password),
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

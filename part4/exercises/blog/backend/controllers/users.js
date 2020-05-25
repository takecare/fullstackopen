const config = require("../utils/config");
const express = require("express");
const bcrypt = require("bcrypt");
const Model = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Model.find({});
  res.send(result.map((item) => item.toJSON()));
});

router.get("/:id", async (req, res) => {
  // TODO return user
});

router.post("/", async (req, res) => {
  const body = req.body;

  if (body.password.length < 3) {
    throw {
      name: "ValidationError",
      message: "Password has to be at least 3 characters long",
    };
  } else if (body.username.length < 3) {
    throw {
      name: "ValidationError",
      message: "Username has to be at least 3 characters long",
    };
  }

  const passwordHash = await bcrypt.hash(body.password, config.saltRounds);

  const result = await Model.create({
    name: body.name,
    username: body.username,
    passwordHash: passwordHash,
  });

  res.status(201).send(result.toJSON());
});

module.exports = router;

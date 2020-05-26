const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/user");
const config = require("../utils/config");
const router = express.Router();

// https://www.npmjs.com/package/jsonwebtoken
// https://gist.github.com/ziluvatar/a3feb505c4c0ec37059054537b38fc48

router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username });

  if (!user) {
    throw {
      name: "UserNotFound",
      message: `Username '${username}' not found.`,
    };
  }

  const result = await bcrypt.compare(password, user.passwordHash);
  if (!result) {
    throw { name: "InvalidPassword" };
  }

  const token = jwt.sign(
    { username: username, id: user._id },
    config.jwtSecret,
    { expiresIn: "7 days" }
  );
  res.status(200).send({ token: token, username: user.username });
});

module.exports = router;

// const bcrypt = require("bcrypt");
const config = require("./config");

const hashPassword = (bcrypt) => async (password) => {
  return await bcrypt.hash(password, config.saltRounds);
};

module.exports = hashPassword;

require("dotenv").config();

const mongoPassword = process.env.MONGODB_PW;
const mongoUrl = process.env.MONGODB_URI.replace("<password>", mongoPassword);
const port = process.env.PORT;

module.exports = {
  mongoUrl,
  port,
};

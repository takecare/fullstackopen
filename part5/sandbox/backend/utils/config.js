require("dotenv").config();

const password = process.env.MONGODB_PW;
const mongoProdUrl = process.env.MONGODB_URI.replace("<password>", password);
const mongoTestUrl = process.env.MONGODB_TEST_URI.replace(
  "<password>",
  password
);
const port = process.env.PORT;

const isTestEnv = process.env.NODE_ENV === "test";

const mongoUrl = isTestEnv ? mongoTestUrl : mongoProdUrl;

const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  isTestEnv,
  jwtSecret,
  mongoUrl,
  port,
};

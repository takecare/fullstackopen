require("dotenv").config();

const password = process.env.MONGODB_PW;
const mongoProdUrl = process.env.MONGODB_URI.replace("<password>", password);
const mongoTestUrl = process.env.MONGODB_TEST_URI.replace(
  "<password>",
  password
);
const port = process.env.PORT;

const mongoUrl = process.env.NODE_ENV === "test" ? mongoTestUrl : mongoProdUrl;

module.exports = {
  mongoUrl,
  port,
};

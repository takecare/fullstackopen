require("dotenv").config();

const isTestEnv = process.env.NODE_ENV === "test";

const mongoPassword = isTestEnv
  ? process.env.MONGODB_TEST_PW
  : process.env.MONGODB_PROD_PW;
const mongoUri = isTestEnv
  ? process.env.MONGODB_TEST_URI
  : process.env.MONGODB_PROD_URI;
const uri = mongoUri.replace("<password>", mongoPassword);

const saltRounds = parseInt(process.env.ENCRYPT_SALT_ROUNDS);
const jwtSecret = process.env.JWT_SECRET;

const port = process.env.PORT;

module.exports = {
  mongoUri: uri,
  saltRounds,
  jwtSecret,
  port,
};

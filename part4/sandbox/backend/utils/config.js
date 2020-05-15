require("dotenv").config();
const password = process.env.MONGODB_PW;
const mongoUrl = process.env.MONGODB_URI.replace("<password>", password);
const port = process.env.PORT;

module.exports {
    mongoUrl, port
}
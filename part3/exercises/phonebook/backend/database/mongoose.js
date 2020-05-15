const mongoose = require("mongoose");

require("dotenv").config();
const password = process.env.MONGODB_PW;
const mongoUrl = process.env.MONGODB_URI.replace("<password>", password);

const mongooseWrapper = {
  connect: () => {
    mongoose
      .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true, // mongoose-unique-validator
      })
      .then(() => console.log("Connected to MongoDB"))
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
      });
  },
};

module.exports = mongooseWrapper;

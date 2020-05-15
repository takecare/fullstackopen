const mongoose = require("mongoose");

const usage = "Usage: node mongo.js <password> [name] [number]";
const args = process.argv.slice(2); // eslint-disable-line no-undef

if (args.length === 0) {
  console.log(usage);
  process.exit(1); // eslint-disable-line no-undef
}

const password = args[0];
const url = `mongodb+srv://fullstack:${password}@fullstack-u4b60.mongodb.net/numbers-app?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const numberSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Number = mongoose.model("Number", numberSchema);

if (args.length === 1) {
  Number.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((number) => console.log(number));
    mongoose.connection.close();
  });
} else if (args.length === 3) {
  const number = new Number({
    name: args[1],
    number: args[2],
  });
  number.save().then(() => {
    mongoose.connection.close();
  });
} else {
  console.log(usage);
  process.exit(1);
}

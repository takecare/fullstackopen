const mongoose = require("mongoose");

// https://mongoosejs.com/docs/models.html

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
});
const Person = mongoose.model("Person", personSchema);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = Person;

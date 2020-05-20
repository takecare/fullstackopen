const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: { type: String, minlength: 3, required: true },
  date: { type: Date, required: true },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    if (returnedObject.userId) {
      returnedObject.userId = returnedObject.user._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);

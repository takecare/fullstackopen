const Note = require('../models/note');
const User = require('../models/user');

const repository = () => ({
  create: async function (userId, content, isImportant) {
    const newNote = new Note({
      important: isImportant || false,
      content: content,
      date: new Date(),
      user: userId,
    });

    // FIXME as a repository we should be nowhere near User, this should be
    // more high level
    const note = await newNote.save();
    const user = await User.findById(userId);
    user.notes = user.notes.concat(note._id);
    delete user._id;
    await user.save();

    return note;
  },
  deleteAll: async function () {
    await Note.deleteMany();
  },
});

module.exports = repository;

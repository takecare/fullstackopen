const User = require('../models/user');

const repository = (bcrypt) => ({
  create: async function (name, username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      username: username,
      name: name,
      passwordHash: passwordHash,
    };
    return await User.create(newUser);
  },
  read: async function (id) {
    return await User.findById(id).populate('notes', {
      important: 1,
      content: 1,
      date: 1,
    });
  },
  update: async function (user) {
    const existing = User.findById(user._id);
    existing.name = user.name;
    existing.username = user.username;
    existing.passwordHash = user.passwordHash;
    existing.notes = user.notes;
    return await existing.save();
  },
  deleteAll: async function () {
    await User.deleteMany();
  },
});

module.exports = repository;

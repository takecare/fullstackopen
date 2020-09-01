const router = require('express').Router();
const bcrypt = require('bcrypt');
const userRepository = require('../repository/user')(bcrypt);
const noteRepository = require('../repository/note')();

router.post('/clear', async (req, res, next) => {
  try {
    await userRepository.deleteAll();
    await noteRepository.deleteAll();
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

router.post('/populate', async (req, res, next) => {
  try {
    const user = await userRepository.create('name', 'test', 'password');
    const note = await noteRepository.create(user._id, 'a note', false);
    user.notes = user.notes.concat(note._id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;

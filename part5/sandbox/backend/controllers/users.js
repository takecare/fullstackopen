const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  const result = await User.find({}).populate('notes', {
    important: 1,
    content: 1,
    date: 1,
  });
  const users = result.map((user) => user.toJSON());
  res.status(200).send(users);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await User.findById(id).populate('notes', {
    important: 1,
    content: 1,
    date: 1,
  });
  res.status(200).send(result.toJSON());
});

router.post('/', async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      username: req.body.username,
      name: req.body.name,
      passwordHash: passwordHash,
    };
    const result = await User.create(newUser);
    res.status(201).send(result.toJSON());
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

router.put('/:id', async (req, res) => {
  // TODO
});

module.exports = router;

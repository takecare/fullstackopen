const router = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

router.get("/", async (req, res, next) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note.toJSON());
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Note.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.body.userId);
    if (!user) {
      throw { name: "UserNotFound" };
    }
  } catch (error) {
    next(error);
    return;
  }

  const newNote = new Note({
    important: req.body.important || false,
    content: req.body.content,
    date: new Date(),
    user: user._id,
  });

  try {
    const note = await newNote.save();
    user.notes = user.notes.concat(note._id);
    await user.save();
    res.status(201).send(note.toJSON());
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const updateNote = {
    content: req.body.content,
    important: req.body.important,
  };

  try {
    const result = await Note.findByIdAndUpdate(req.params.id, updateNote, {
      new: true,
    });
    res.json(result.toJSON());
  } catch (error) {
    next(error);
  }
});

module.exports = router;

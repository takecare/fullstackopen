const router = require("express").Router();
const Note = require("../models/note");

router.get("/", async (req, res, next) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        return res.json(note.toJSON());
      } else {
        throw { error: "NotFound" };
      }
    })
    .catch((error) => next(error));
});

router.delete("/:id", (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

router.post("/", (req, res, next) => {
  const newNote = new Note({
    important: false,
    ...req.body,
    date: new Date(),
  });

  newNote
    .save()
    .then(() => newNote.toJSON())
    .then((note) => res.status(201).send(note))
    .catch((error) => next(error));
});

router.put("/:id", (req, res, next) => {
  const updateNote = {
    content: req.body.content,
    important: req.body.important,
  };
  Note.findByIdAndUpdate(req.params.id, updateNote, { new: true })
    .then((result) => {
      if (result) {
        return res.json(result.toJSON());
      } else {
        throw { name: "NotFound" };
      }
    })
    .catch((error) => next(error));
});

module.exports = router;

const notesService = require("../services/notes.service");

const get = (req, res, next) => {
  notesService
    .get(req.params._id)
    .then((note) => {
      if (note) {
        if (note.owner != req.userId) return res.sendStatus(403);
        res.send(note);
      } else res.sendStatus(404);
    })
    .catch((err) => next(err));
};

const getAll = (req, res, next) => {
  notesService
    .getAll(req.userId)
    .then((notes) => {
      if (notes) res.send(notes);
      else res.sendStatus(404);
    })
    .catch((err) => next(err));
};

const create = (req, res, next) => {
  const { note } = req.body;
  if (!note) return res.status(400).send("Note is a required field");
  const newNote = notesService.create(req.userId, note);
  newNote.save((err) => {
    if (err) return next(err);
    res.send(newNote);
  });
};

module.exports = {
  get,
  getAll,
  create,
};

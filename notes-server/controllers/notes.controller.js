const notesService = require("../services/notes.service");

const get = (req, res, next) => {
  notesService
    .get(req.params._id, req.userId)
    .then((note) => {
      if (note) {
        res.set('Cache-Control', 'no-store')
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
    res.status(201).send(newNote);
  });
};

const createBlank = (req, res, next) => {
  if (!note) return res.status(400).send("Note is a required field");
  const newNote = notesService.create(req.userId, "");
  newNote.save((err) => {
    if (err) return next(err);
    res.status(201).send(newNote);
  });
};

const save = async (req, res, next) => {
  const { note } = req.body;
  if (!note) return res.status(400).send("Note is a required field");
  console.log(req.params._id, req.userId);
  const existingNote = await notesService.get(req.params._id, req.userId);
  console.log(existingNote)
  if (!existingNote) return res.sendStatus(404);
  existingNote.note = note;
  existingNote.lastModified = new Date();
  existingNote.save((err) => {
    if (err) return next(err);
    res.status(200).send(existingNote);
  });
};

module.exports = {
  get,
  getAll,
  create,
  createBlank,
  save,
};

const notesService = require("../services/notes.service");
const usersService = require("../services/users.service");

/**
 *
 * Returns specific note if user has access
 */
const get = (req, res, next) => {
  notesService
    .get(req.params._id, req.userId)
    .then((note) => {
      if (note) {
        res.set("Cache-Control", "no-store");
        res.send(note);
      } else res.sendStatus(404);
    })
    .catch((err) => next(err));
};

/**
 *
 * returns all notes that user has access to
 */
const getAll = (req, res, next) => {
  notesService
    .getAll(req.userId)
    .then((notes) => {
      if (notes) res.send(notes);
      else res.sendStatus(404);
    })
    .catch((err) => next(err));
};

/**
 *
 * creates new note with body
 */
const create = (req, res, next) => {
  const { note } = req.body;
  if (!note) return res.status(400).send("Note is a required field");
  const newNote = notesService.create(req.userId, note);
  newNote.save((err) => {
    if (err) return next(err);
    res.status(201).send(newNote);
  });
};

/**
 *
 * creates blank note and returns note object
 */
const createBlank = (req, res, next) => {
  const newNote = notesService.create(req.userId, "");
  newNote.save((err) => {
    if (err) return next(err);
    res.status(201).send(newNote);
  });
};

/**
 *
 * updates existing note if user has access
 */
const save = async (req, res, next) => {
  const { note } = req.body;
  if (!note) return res.status(400).send("Note is a required field");
  console.log(req.params._id, req.userId);
  const existingNote = await notesService.get(req.params._id, req.userId);
  if (!existingNote) return res.sendStatus(404);
  existingNote.note = note;
  existingNote.lastModified = new Date();
  existingNote.save((err) => {
    if (err) return next(err);
    res.status(200).send(existingNote);
  });
};

/**
 * Updates existing note parameters if user has access
 */
const update = async (req, res, next) => {
  const { note, sharedWith } = req.body;
  if (!note && !sharedWith) {
    res.status(400).send("At least one parameter required.");
    return;
  }

  const existingNote = await notesService.get(req.params._id, req.userId);
  if (!existingNote) return res.sendStatus(404);
  if (existingNote.owner != req.userId) {
    res.sendStatus(403);
    return;
  }
  if (note) {
    existingNote.note = note;
  }
  if (sharedWith) {
    if (!Array.isArray(sharedWith)) {
      res.status(400).send("sharedWith must be an array.");
      return;
    }

    for (const userId of sharedWith) {
      const user = await usersService.get(userId);
      if (!user) {
        res.status(400).send(`userId ${userId} is invalid`);
        return;
      }
    }

    existingNote.sharedWith = sharedWith;
  }
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
  update,
};

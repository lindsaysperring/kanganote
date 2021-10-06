const notesService = require("../services/notes.service");

const get = (req, res, next) => {
  notesService
    .get()
    .then((note) => {
      if (note) res.send(note);
      else res.sendStatus(404);
    })
    .catch((err) => next(err));
};

const getAll = (req, res, next) => {
  notesService
    .getAll()
    .then((notes) => {
      if (notes) res.send(note);
      else res.sendStatus(404);
    })
    .catch((err) => next(err));
};

module.exports = {
  get,
  getAll,
};

const Note = require("../models/notes.models");

const get = (_id) => {
  return Note.findById(_id);
};

const getAll = (owner) => {
  return Note.find({ owner });
};

const create = (userId, note) => {
  const newNote = new Note({ note, createdAt: new Date(), owner: userId });
  return newNote;
};

module.exports = { get, getAll, create };

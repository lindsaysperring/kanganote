const Notes = require("../models/notes.models");

const get = (_id) => {
  return Notes.findById(_id);
};

const getAll = () => {
  return Notes.find({});
};

module.exports = { get, getAll };

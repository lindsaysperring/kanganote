const Note = require("../models/notes.models");

/**
 * Get Note by ID
 * @param {string} _id 
 * @returns {object} Note object
 */
const get = (_id) => {
  return Note.findById(_id);
};

/**
 * Gets all notes created by user
 * @param {string} owner 
 * @returns {object} Note
 */
const getAll = (owner) => {
  return Note.find({ owner });
};

/**
 * Creates new note
 * @param {string} userId 
 * @param {string} note 
 * @returns {object} Note
 */
const create = (userId, note) => {
  const newNote = new Note({ note, createdAt: new Date(), owner: userId });
  return newNote;
};

module.exports = { get, getAll, create };

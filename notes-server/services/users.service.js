const User = require("../models/user.models");

/**
 * Gets user by ID
 * @param {string} _id
 * @returns {object} User
 */
const get = (_id) => {
  return User.findById(_id);
};

/**
 * Gets user by email
 * @param {string} email
 * @returns {object} User
 */
const getByEmail = (email) => {
  return User.findOne({ email: { $regex: new RegExp(email, "i") } });
};

/**
 * Gets all users
 * @returns {object} User
 */
const getAll = () => {
  return User.find({});
};

module.exports = { get, getAll, getByEmail };

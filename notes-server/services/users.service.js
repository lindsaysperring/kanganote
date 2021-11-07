const User = require("../models/user.models");
const {FuzzySearch}=require('mongoose-fuzzy-search-next');

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
  return User.findOne({ email });
};

/**
 * Gets all users
 * @returns {object} User
 */
const getAll = () => {
  return User.find({});
};

/**
 * 
 * @param {string} searchTerm 
 * @returns array of users
 */
const searchEmail = (searchTerm) => {
  return User.find({email: {$regex: searchTerm, $options: 'i'}});
};

module.exports = { get, getAll, getByEmail, searchEmail };

const User = require("../models/user.models");

const get = (_id) => {
  return User.findById(_id);
};

const getByEmail = (email) => {
  return User.findOne({ email });
};

const getAll = () => {
  return User.find({});
};

module.exports = { get, getAll, getByEmail };

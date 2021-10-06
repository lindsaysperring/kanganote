const User = require("../models/user.models")

const get = (_id) => {
    return User.findById(_id);
  };
  
  const getAll = () => {
    return User.find({});
  };
  
  module.exports = { get, getAll };
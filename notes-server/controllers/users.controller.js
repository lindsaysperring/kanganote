const userService = require("../services/users.service");

const get = (req, res, next) => {
  userService
    .get(req.params._id)
    .then((note) => {
      if (note) res.send(note);
      else res.sendStatus(404);
    })
    .catch((err) => next(err));
};

const getAll = (req, res, next) => {
  userService
    .getAll()
    .then((notes) => {
      if (notes) res.send(notes);
      else res.sendStatus(404);
    })
    .catch((err) => next(err));
};

module.exports = {
  get,
  getAll,
};

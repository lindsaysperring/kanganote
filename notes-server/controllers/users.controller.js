const userService = require("../services/users.service");
const bcrypt = require("bcrypt");

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

const changePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) return res.status(400).send("Password is required");
  else if (password == "")
    return res.status(400).send("Password cannot be empty");

  userService
    .get(req.userId)
    .then(async (user) => {
      if (!user) return res.status(401);
      const hashedPassword = await bcrypt
        .hash(password, 12)
        .then((hash) => hash);
      user.password = hashedPassword;
      user.save((err) => {
        if (err) return next(err);
        res.status(200).send("Password updated");
      });
    })
    .catch((err) => next(err));
};

const changeUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email)
    return res.status(400).send("Name and email are required.");
  console.log(req.userId);
  userService
    .get(req.userId)
    .then((user) => {
      if (!user) return res.status(401);
      let updated = false;
      if (user.name != name && name != "") {
        user.name = name;
        updated = true;
      }

      if (user.email != email && email != "") {
        user.email = email;
        updated = true;
      }
      if (updated) {
        user.save((err) => {
          if (err) return next(err);
          res.status(200).send({ name: user.name, email: user.email });
        });
      } else {
        res.sendStatus(304);
      }
    })
    .catch((err) => next(err));
};

module.exports = {
  get,
  getAll,
  changePassword,
  changeUserInfo,
};

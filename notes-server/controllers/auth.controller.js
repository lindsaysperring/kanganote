const User = require("../models/user.models");
const genJWT = require("../utils/genJWT");
const userService = require("../services/users.service");
const bcrypt = require("bcrypt");

const register = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).send("Email, Password and Name are required.");
  }

  userService
    .getByEmail(email)
    .then(async (result) => {
      if (result) return res.status(400).send("Email already in use.");
      const hashedPassword = await bcrypt
        .hash(password, 12)
        .then((hash) => hash);
      console.log(hashedPassword);
      const user = new User({
        email,
        password: hashedPassword,
        name,
        createdAt: new Date(),
      });
      user.save((err) => {
        if (err) return next(err);
        res.send({ token: genJWT(user) });
      });
    })
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and Password are required.");
  }

  userService
    .getByEmail(email)
    .then((user) => {
      if (!user) return res.status(401).send("Invalid email and/or password");
      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          return res.send({
            token: genJWT(user),
            name: user.name,
            email: user.email,
            userId: user.id,
          });
        } else {
          return res.status(401).send("Invalid email and/or password");
        }
      });
    })
    .catch((err) => next(err));
};

module.exports = { register, login };

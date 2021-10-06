const jwt = require("jsonwebtoken");
const config = require("../config");

const genJWT = (user) => {
  return jwt.sign({ userId: user.id }, config.secret);
};

module.exports = genJWT;

const jwt = require("jsonwebtoken");
const config = require("../config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) return res.sendStatus(401);
  const bearer = authHeader.split(" ");
  const token = bearer[1];

  try {
    const decoded = jwt.verify(token, config.secret);
    if (decoded) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    return res.sendStatus(401);
  }
};

module.exports = authMiddleware;

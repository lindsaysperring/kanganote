const express = require("express");
const notes = require("./notes.route");
const auth = require("./auth.route");
const users = require("./users.route");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use("/auth", auth);

router.use(authMiddleware);

router.use("/notes", notes);

router.use("/users", users);

router.get("/health", (req, res) => {
  // https://gist.github.com/ali-kamalizade/05488b11e703b5e26c46e3a3d913bedf
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  }
});

router.use((err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  next(err);
});
module.exports = router;

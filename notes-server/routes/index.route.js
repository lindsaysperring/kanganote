const express = require("express");
const notes = require("./notes.route");
const users = require("./users.route");

const router = express.Router();

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

module.exports = router;

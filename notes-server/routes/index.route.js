const express = require("express");
const notes = require("./notes.route");
const users = require("./users.route");

const router = express.Router();

router.use("/notes", notes);

router.use("/users", users);

router.get("/health", (req, res) => {
  const health = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  res.send(JSON.stringify(health));
});

module.exports = router;

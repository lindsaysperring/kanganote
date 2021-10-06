const express = require("express");
const router = express.Router({ mergeParams: true });

const usersController = require("../controllers/users.controller");

router.route("/").get(usersController.getAll);

router.route("/:_id").get(usersController.get);

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

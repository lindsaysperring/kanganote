const express = require("express");
const router = express.Router({ mergeParams: true });

const usersController = require("../controllers/users.controller");

router.route("/").get(usersController.getAll);

router.route("/:_id").get(usersController.get);

module.exports = router;

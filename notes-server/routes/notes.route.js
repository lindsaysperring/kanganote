const express = require("express");
const router = express.Router({ mergeParams: true });

const notesController = require("../controllers/notes.controller");

router.route("/").get(notesController.getAll);

router.route("/:_id").get(notesController.get);

router.route("/").post(notesController.create);

module.exports = router;

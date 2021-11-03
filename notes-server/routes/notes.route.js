/**
 * @swagger
 * definitions:
 *  Note:
 *      properties:
 *          note:
 *              type: string
 *              example: this is a test
 *          createdAt:
 *              type: string
 *              example: 2021-10-12T02:50:27.274Z
 *          owner:
 *              type: string
 *              example: 6164f75f975969dc90e594b6
 *          sharedWith:
 *              type: array
 *              items:
 *                  type: string
 *                  example: 6164f75f975969dc90e594b6
 *          id:
 *              type: string
 *              example: 6164f7f3ad7260e1673a0335
 *  New Note:
 *      properties:
 *          note:
 *              type: string
 *              example: this is a test
 *  Updated Note:
 *      properties:
 *          email:
 *              type: string
 *              example: john@smith.com
 *          password:
 *              type: string
 *              example: thisisasecurepassword *
 *          sharedWith:
 *              type: array
 *              items:
 *                  type: string
 *                  example: 6164f75f975969dc90e594b6
 */
/**
 * @swagger
 * tags:
 *  name: Notes
 */
const express = require("express");
const router = express.Router({ mergeParams: true });

const notesController = require("../controllers/notes.controller");

/**
 * @swagger
 * /api/notes:
 *  get:
 *      description: Return all notes for user
 *      tags: [Notes]
 *      produces:
 *          - application/json
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: header
 *            name: Authorization
 *            example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTY0Zjc1Zjk3NTk2OWRjOTBlNTk0YjYiLCJpYXQiOjE2MzQwMDY4Nzl9.BsMqStsAxrQNBM1yUj8MOB_oZua-Td7mLvjoqGSo3bs
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Array of notes
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/definitions/Note'
 */
router.route("/").get(notesController.getAll);

/**
 * @swagger
 * /api/notes:
 *  get:
 *      description: Creates a new blank note
 *      tags: [Notes]
 *      produces:
 *          - application/json
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: header
 *            name: Authorization
 *            example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTY0Zjc1Zjk3NTk2OWRjOTBlNTk0YjYiLCJpYXQiOjE2MzQwMDY4Nzl9.BsMqStsAxrQNBM1yUj8MOB_oZua-Td7mLvjoqGSo3bs
 *            schema:
 *              type: string
 *          - in: body
 *            name: New note
 *            description: New note to create
 *            schema:
 *              type: object
 *              $ref: '#/definitions/New Note'
 *      responses:
 *          201:
 *              description: Created note
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Note'
 */
router.route("/new").get(notesController.createBlank);

/**
 * @swagger
 * /api/notes/{noteId}:
 *  get:
 *      description: Return specific note if owned or shared with user
 *      tags: [Notes]
 *      produces:
 *          - application/json
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: noteId
 *            schema:
 *              type: string
 *            required: true
 *            description: ID of note
 *          - in: header
 *            name: Authorization
 *            example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTY0Zjc1Zjk3NTk2OWRjOTBlNTk0YjYiLCJpYXQiOjE2MzQwMDY4Nzl9.BsMqStsAxrQNBM1yUj8MOB_oZua-Td7mLvjoqGSo3bs
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Selected note
 *              schema:
 *                  type: object
 *                  items:
 *                      $ref: '#/definitions/Note'
 */
router.route("/:_id").get(notesController.get);

/**
 * @swagger
 * /api/notes:
 *  post:
 *      description: Create a new Note
 *      tags: [Notes]
 *      produces:
 *          - application/json
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: header
 *            name: Authorization
 *            example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTY0Zjc1Zjk3NTk2OWRjOTBlNTk0YjYiLCJpYXQiOjE2MzQwMDY4Nzl9.BsMqStsAxrQNBM1yUj8MOB_oZua-Td7mLvjoqGSo3bs
 *            schema:
 *              type: string
 *          - in: body
 *            name: New note
 *            description: New note to create
 *            schema:
 *              type: object
 *              $ref: '#/definitions/New Note'
 *      responses:
 *          201:
 *              description: Created note
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Note'
 */
router.route("/").post(notesController.create);

/**
 * @swagger
 * /api/notes:
 *  patch:
 *      description: Updates existing note
 *      tags: [Notes]
 *      produces:
 *          - application/json
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: header
 *            name: Authorization
 *            example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTY0Zjc1Zjk3NTk2OWRjOTBlNTk0YjYiLCJpYXQiOjE2MzQwMDY4Nzl9.BsMqStsAxrQNBM1yUj8MOB_oZua-Td7mLvjoqGSo3bs
 *            schema:
 *              type: string
 *          - in: body
 *            name: New note
 *            description: New note to create
 *            schema:
 *              type: object
 *              $ref: '#/definitions/New Note'
 *      responses:
 *          200:
 *              description: Created note
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Note'
 */
router.route("/save/:_id").patch(notesController.save);

/**
 * @swagger
 * /api/notes:
 *  patch:
 *      description: Updates existing note
 *      tags: [Notes]
 *      produces:
 *          - application/json
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: header
 *            name: Authorization
 *            example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTY0Zjc1Zjk3NTk2OWRjOTBlNTk0YjYiLCJpYXQiOjE2MzQwMDY4Nzl9.BsMqStsAxrQNBM1yUj8MOB_oZua-Td7mLvjoqGSo3bs
 *            schema:
 *              type: string
 *          - in: body
 *            name: Parameters to update
 *            description: Parameters to update. At least one needed
 *            schema:
 *              type: object
 *              $ref: '#/definitions/Updated Note'
 *      responses:
 *          200:
 *              description: Updated note
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Note'
 */
router.route("/:_id").patch(notesController.update);

module.exports = router;

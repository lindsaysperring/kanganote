

/**
 * @swagger
 * definitions:
 *  Token:
 *      properties:
 *          token:
 *              type: string
 *  UserLogin:
 *      required:
 *          - email
 *          - password
 *      properties:
 *          email:
 *              type: string
 *          password:
 *              type: string
 *  Register:
 *      required:
 *          - email
 *          - name
 *          - password
 *      properties:
 *          email:
 *              type: string
 *          name:
 *              type: string
 *          password:
 *              type: string
 */

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: User management and login
 */

const express = require("express");
const router = express.Router({ mergeParams: true });

const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      description: Create new user
 *      tags: [Authentication]
 *      produces:
 *          - application/json
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: New user
 *            description: User to create
 *            schema:
 *              $ref: '#/definitions/Register'
 *      responses:
 *          200:
 *              description: Returned Token
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Token'
 */
router.route("/register").post(authController.register);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      description: Login to get jwt
 *      tags: [Authentication]
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: user
 *            description: User to login
 *            schema:
 *               $ref: '#/definitions/UserLogin'
 *      responses:
 *          200:
 *              description: Returned token
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Token'
 *              
 */
router.route("/login").post(authController.login);

module.exports = router;

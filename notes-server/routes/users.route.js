/**
 * @swagger
 * definitions:
 *  Token:
 *      properties:
 *          token:
 *              type: string
 *  ChangeUserInfo:
 *      properties:
 *          name:
 *              type: string
 *          email:
 *              type: string
 *          password:
 *              type: string
 *  ChangeUserInfoResponse:
 *      properties:
 *          name:
 *              type: string
 *          email:
 *              type: string
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User management
 */

const express = require("express");
const router = express.Router({ mergeParams: true });

const userController = require("../controllers/users.controller");

/**
 * @swagger
 * /api/users/changeInfo:
 *  patch:
 *      description: Change user info
 *      tags: [Users]
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
 *            name: User info
 *            description: Info to update
 *            schema:
 *              $ref: '#/definitions/ChangeUserInfo'
 *      responses:
 *          200:
 *              description: User info changed
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/ChangeUserInfoResponse'
 */
router.route("/changeInfo").patch(userController.changeUserInfo);

module.exports = router;

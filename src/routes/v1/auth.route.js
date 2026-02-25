const express = require("express");
const { validate } = require("../../middlewares");
const { authValidations } = require("../../validations");
const { authController } = require("../../controllers");
const { authenticateLocal } = require("../../middlewares");
const router = express.Router();

// ! INFO: Local Strategy
// router.post(
//   "/login",
//   validate(authValidations.loginUser),
//   authenticateLocal(false),
//   authController.loginUser
// );

// ! Local Strategy with Sessions using Redis
router.post(
  "/login",
  validate(authValidations.loginUser),
  authenticateLocal(true),
  authController.loginUser
);

module.exports = router;

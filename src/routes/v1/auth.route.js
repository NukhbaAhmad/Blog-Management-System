const express = require("express");
const { validate } = require("../../middlewares");
const { authValidations } = require("../../validations");
const { authController } = require("../../controllers");
const { auth } = require("../../middlewares");
const router = express.Router();

// ! INFO: Local Strategy
// router.post(
//   "/login",
//   validate(authValidations.loginUser),
//   auth.authenticateLocal(false),
//   authController.loginUser
// );

// ! Local Strategy with Sessions using Redis
router.post(
  "/login",
  validate(authValidations.loginUser),
  auth.authenticateLocal(true),
  authController.loginUser
);
router.post(
  "/logout",
  validate(authValidations.logoutUser),
  authController.logoutUser
);

module.exports = router;

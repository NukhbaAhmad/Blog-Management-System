const express = require("express");
const { status: httpStatus } = require("http-status");
const passport = require("passport");
const { sendResponse } = require("../../utils");
const router = express.Router();

// ! INFO: Local Strategy
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      sendResponse(res, httpStatus.UNAUTHORIZED, {
        message: info.message,
      });
    }
    req.login(user, { session: false }, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      sendResponse(res, httpStatus.OK, {
        message: info.message,
        data: user,
      });
    });
  })(req, res, next);
});

// Local Strategy with Sessions

module.exports = router;

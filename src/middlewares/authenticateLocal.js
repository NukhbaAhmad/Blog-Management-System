const passport = require("passport");
const { sendResponse } = require("../utils");
const { status: httpStatus } = require("http-status");

const authenticateLocal = (session) => (req, res, next) => {
  passport.authenticate("local", { session }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      sendResponse(res, httpStatus.NOT_FOUND, { message: info.message });
    }
    // Passport calls serialize & store to redis memory
    req.login(user, { session }, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      req.authMessage = info?.message;
      next();
    });
  })(req, res, next);
};

module.exports = authenticateLocal;

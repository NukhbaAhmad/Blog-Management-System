const { sendResponse } = require("../utils");
const { authService } = require("../services");
const { status: httpStatus } = require("http-status");

const loginUser = (req, res, next) => {
  sendResponse(res, httpStatus.OK, {
    message: req.authMessage,
    data: req.user,
  });
};
const logoutUser = async (req, res, next) => {
  // console.log("1-Signed Cookies:", req.signedCookies);
  try {
    await authService.logout(req, res);
    sendResponse(res, httpStatus.OK, {
      message: "User logged out successfully.",
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = { loginUser, logoutUser };

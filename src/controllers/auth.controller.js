const { sendResponse } = require("../utils");
const { authService } = require("../services");
const { status: httpStatus } = require("http-status");
const { catchAsync } = require("../utils");

const register = catchAsync(async (req, res, next) => {
  const { author, message } = await authService.registerUser(req, res);
  sendResponse(res, httpStatus.CREATED, {
    message,
    data: author,
  });
});

const login = catchAsync((req, res, next) => {
  sendResponse(res, httpStatus.OK, {
    message: req.authMessage,
    data: req.user,
  });
});

const logout = catchAsync(async (req, res, next) => {
  // console.log("1-Signed Cookies:", req.signedCookies);
  await authService.logoutUser(req, res);
  sendResponse(res, httpStatus.OK, {
    message: "User logged out successfully.",
  });
});
module.exports = { login, logout, register };

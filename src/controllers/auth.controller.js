const { sendResponse } = require("../utils");
const { status: httpStatus } = require("http-status");

const loginUser = (req, res, next) => {
  sendResponse(res, httpStatus.OK, {
    message: req.authMessage,
    data: req.user,
  });
};
module.exports = { loginUser };

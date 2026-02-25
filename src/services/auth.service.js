const { status: httpStatus } = require("http-status");
const { ApiError } = require("../utils");

const logout = (req, res) => {
  // Reject resolve: ensures that all steps performed succesfully only then user sent success response.
  return new Promise((resolve, reject) => {
    const message = "Something went wrong when attempting to logout.";
    req.logout((error) => {
      if (error) {
        console.log("Logout Failed:", error);
        return reject(
          new ApiError({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message,
            isOperational: false,
          })
        );
      }
      req.session.destroy((err) => {
        if (err) {
          console.log("Redis session destruction failed:", err);
          return reject(
            new ApiError({
              statusCode: httpStatus.INTERNAL_SERVER_ERROR,
              message,
              isOperational: false,
            })
          );
        }
        res.clearCookie("secret_id");
        resolve(); // Safe to send response/continue to send response.
      });
    });
  });
};

module.exports = { logout };

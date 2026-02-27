const { status: httpStatus } = require("http-status");
const { Author } = require("../models");
const { ApiError, promisify } = require("../utils");

const registerUser = async (req) => {
  const payload = req.body;
  if (await Author.isEmailTaken(payload.email)) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Email is already taken",
      isOperational: true,
    });
  }
  if (await Author.isUsernameTaken(payload.username)) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Username is already taken",
      isOperational: true,
    });
  }
  const author = await Author.create(payload);
  try {
    const loginUser = promisify(req.login, req);
    await loginUser(author.toObject());
    return { author, message: "User registered and logged in successfully." };
  } catch (error) {
    return {
      author,
      message: "User registered successfully.Please log in again.",
    };
  }
};

const logoutUser = async (req, res) => {
  // Reject resolve: ensures that all steps performed succesfully only then user sent success response.
  const logout = promisify(req.logout, req);
  const sessionDestroy = promisify(req.session.destroy, req.session);

  try {
    await logout();
    await sessionDestroy();
    res.clearCookie("secret_id");
  } catch (error) {
    throw new ApiError({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to logout the user",
      isOperational: false,
    });
  }
};

module.exports = { logoutUser, registerUser };

// NOTE: throw in services
// No next() use in services as it doesnt exist there
// Use next() in middleware/controllers

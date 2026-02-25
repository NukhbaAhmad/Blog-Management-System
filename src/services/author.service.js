const { status: httpStatus } = require("http-status");
const { Author } = require("../models");
const { ApiError, pick } = require("../utils");

const createAuthor = async (req) => {
  const body = req.body;
  if (await Author.isEmailTaken(body.email)) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Email is already taken.",
      isOperational: true,
    });
  }
  if (await Author.isUsernameTaken(body.username)) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Username is already taken.",
      isOperational: true,
    });
  }
  return await Author.create(body);
};
const queryAuthors = async (req) => {
  const filters = pick(req.query, ["first_name", "username"]);
  const options = pick(req.query, ["limit", "page", "sortBy"]);
  const authorsFound = await Author.paginate(filters, options);
  return authorsFound;
};

const updateAuthorById = async (id, body) => {
  if (!(await Author.doesIdExists(id))) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Author not found.",
    });
  }
  const author = await Author.findById(id);
  if (body.email && (await Author.isEmailTaken(body.email, id))) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Email is already taken.",
      isOperational: true,
    });
  }
  if (body.username && (await Author.isUsernameTaken(body.username, id))) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Username is already taken.",
      isOperational: true,
    });
  }
  Object.assign(author, body);
  await author.save();
  return author;
};

const getAuthorById = async (id) => {
  if (!(await Author.doesIdExists(id))) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Author not found.",
    });
  }
  return await Author.findById(id);
};

const deleteAuthor = async (req) => {
  const id = req.params.id;
  if (!(await Author.doesIdExists(id))) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Author not found.",
    });
  }
  return await Author.findByIdAndDelete(id);
};
module.exports = {
  createAuthor,
  queryAuthors,
  deleteAuthor,
  getAuthorById,
  updateAuthorById,
};

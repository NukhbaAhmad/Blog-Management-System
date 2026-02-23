const { status: httpStatus } = require("http-status");
const { Author } = require("../models");
const { ApiError, pick } = require("../utils");

const createAuthor = async (req) => {
  const body = req.body;
  if (await Author.isEmailTaken(body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already taken.");
  }
  if (await Author.isUsernameTaken(body.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username is already taken.");
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
    throw new ApiError(httpStatus.NOT_FOUND, "Author not found.");
  }
  const author = await Author.findById(id);
  if (body.email && (await Author.isEmailTaken(body.email, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already taken.");
  }
  if (body.username && (await Author.isUsernameTaken(body.username, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username is already taken.");
  }
  Object.assign(author, body);
  await author.save();
  return author;
};

const getAuthorById = async (id) => {
  if (!(await Author.doesIdExists(id))) {
    throw new ApiError(httpStatus.NOT_FOUND, "Author not found.");
  }
  return await Author.findById(id);
};

const deleteAuthor = async (req) => {
  const id = req.params.id;
  if (!(await Author.doesIdExists(id))) {
    throw new ApiError(httpStatus.NOT_FOUND, "Author not found.");
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

const { status: httpStatus } = require("http-status");
const { authorService } = require("../services");
const { catchAsync } = require("../utils");
const { sendResponse } = require("../utils");

const getAuthors = catchAsync(async (req, res) => {
  const authors = await authorService.queryAuthors(req);
  sendResponse(res, httpStatus.OK, { data: authors });
});
const getAuthorById = catchAsync(async (req, res) => {
  const author = await authorService.getAuthorById(req.params.id);
  sendResponse(res, httpStatus.OK, { data: author });
});

const updateAuthorById = catchAsync(async (req, res) => {
  const author = await authorService.updateAuthorById(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, {
    message: "Author updated successfully",
    data: author,
  });
});
const deleteAuthor = catchAsync(async (req, res) => {
  await authorService.deleteAuthor(req);
  sendResponse(res, httpStatus.OK, {
    message: "Author deleted successfully",
  });
});

module.exports = {
  getAuthors,
  deleteAuthor,
  getAuthorById,
  updateAuthorById,
};

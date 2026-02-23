const { status: httpStatus } = require("http-status");
const { authorService } = require("../services");
const { catchAsync } = require("../utils");
const { sendSuccessResponse } = require("../utils");

const getAuthors = catchAsync(async (req, res) => {
  const authors = await authorService.queryAuthors(req);
  sendSuccessResponse(res, httpStatus.OK, { data: authors });
});

const createAuthor = catchAsync(async (req, res) => {
  const author = await authorService.createAuthor(req);
  sendSuccessResponse(res, httpStatus.CREATED, {
    message: "Author Created successfully",
    data: author,
  });
});

const getAuthorById = catchAsync(async (req, res) => {
  const author = await authorService.getAuthorById(req.params.id);
  sendSuccessResponse(res, httpStatus.OK, { data: author });
});

const updateAuthorById = catchAsync(async (req, res) => {
  const author = await authorService.updateAuthorById(req.params.id, req.body);
  sendSuccessResponse(res, httpStatus.OK, {
    message: "Author updated successfully",
    data: author,
  });
});
const deleteAuthor = catchAsync(async (req, res) => {
  await authorService.deleteAuthor(req);
  sendSuccessResponse(res, httpStatus.OK, {
    message: "Author deleted successfully",
  });
});

module.exports = {
  getAuthors,
  createAuthor,
  deleteAuthor,
  getAuthorById,
  updateAuthorById,
};

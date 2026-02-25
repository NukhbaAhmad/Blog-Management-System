const doesIdExists = (schema) => {
  if (!schema) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Author Schema is required.",
    });
  }
  schema.statics.doesIdExists = async function (id) {
    const author = await this.findById(id);
    return !!author; // true if exists false if doesnt exists
  };
};

module.exports = doesIdExists;

const doesIdExists = (schema) => {
  if (!schema) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Author Schema is required.");
  }
  schema.statics.doesIdExists = async function (id) {
    const author = await this.findById(id);
    return !!author; // true if exists false if doesnt exists
  };
};

module.exports = doesIdExists;

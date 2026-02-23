const paginate = (schema) => {
  if (!schema) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Author Schema is required.");
  }
  schema.statics.paginate = async function (filter, options) {
    let sort = "";
    if (options.sortBy) {
      const sortingCriteria = [];
      // "age:desc,name:asc"
      options.sortBy.split(",").forEach((sortOption) => {
        const [key, order] = sortOption.split(":"); // key: age, order:desc
        // "-age", "name"
        sortingCriteria.push((order === "desc" ? "-" : "") + key);
      });
      sort = sortingCriteria.join(" ");
    } else {
      sort = "createdAt";
    }
    const page =
      options.page && parseInt(options.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1;

    const limit =
      options.limit && parseInt(options.limit, 10) > 0
        ? parseInt(options.limit, 10)
        : 10;

    const skip = (page - 1) * limit;

    const count = this.countDocuments(filter).exec();
    // No lean used here as it skips all the schemas/plugins etc
    let docs = this.find(filter).sort(sort).skip(skip).limit(limit).exec();

    return Promise.all([count, docs]).then((values) => {
      const [totalResults, results] = values;
      const pages = Math.ceil(totalResults / limit);
      const result = [
        { total: totalResults, page, count: limit, pages, results },
      ];
      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;

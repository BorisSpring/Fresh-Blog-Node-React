module.exports = class APIFeatures {
  constructor(queryObject, query) {
    this.queryObject = queryObject;
    this.query = query;
  }

  filter() {
    const fieldsToExclude = ['page', 'limit', 'sort', 'fields'];
    const queryObject = { ...this.queryObject };

    fieldsToExclude.forEach((field) => delete queryObject[field]);

    let queryStr = JSON.stringify(queryObject).replace(
      '/\b(gt|gte|lt|lte|ne|eq|in)\b/g',
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryObject.sort) {
      const sortBy = this.queryObject.sort.split(',').join(' ');
      this.query.sort = this.query.sort(sortBy);
    } else {
      this.query.sort = this.query.sort('createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryObject.fields) {
      const fields = this.queryObject.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    return this;
  }

  paginate() {
    const page = this.queryObject.page * 1 || 1;
    const limit = this.queryObject.limit * 1 || 6;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  countDocuments() {
    return this.query.countDocuments();
  }
};

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/APIFeatures');

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const deletedItem = await Model.findByIdAndDelete(req.params.id);

    if (!deletedItem) return next(new AppError('Fail to delete document', 404));

    res.status(204).json({
      status: 'success',
    });
  });
};

exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const createdDocument = await Model.create(req.body);

    if (!createdDocument)
      return next(new AppError('Fail to create document', 400));

    res.status(201).json({
      status: 'success',
      data: {
        document: createdDocument,
      },
    });
  });
};

exports.findAll = (Model, populateOptions, fields) => {
  return catchAsync(async (req, res, next) => {
    if (fields) req.query.fields = fields;

    const features = new APIFeatures(req.query, Model.find())
      .filter()
      .limitFields()
      .sort()
      .paginate();

    if (populateOptions) {
      features.query.populate(populateOptions);
    }

    const documents = await features.query;

    const totalDocuments = await new APIFeatures(req.query, Model.find())
      .filter()
      .countDocuments();

    res.status(200).json({
      status: 'success',
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / (req.query.limit || 6)),
      data: documents,
    });
  });
};

exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const updatedDocument = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDocument) {
      return next(
        new AppError(`Document with id ${req.params.id} doesn't exist's!`, 404)
      );
    }

    res.status(200).json({
      status: 'success',
      data: { document: updatedDocument },
    });
  });
};

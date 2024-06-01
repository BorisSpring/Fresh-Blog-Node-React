const Category = require('../models/categoryModel');
const {
  deleteOne,
  createOne,
  updateOne,
} = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.createCategory = createOne(Category);

exports.deleteCategory = deleteOne(Category);

exports.updateCategory = updateOne(Category);

exports.findAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    data: categories,
  });
});

exports.findMost4PopularCategories = catchAsync(async (req, res, next) => {
  const mostPopularCategories = await Category.aggregate([
    {
      $lookup: {
        from: 'blogs',
        localField: '_id',
        foreignField: 'category',
        as: 'blogs',
      },
    },
    {
      $project: {
        name: 1,
        blogs: {
          $filter: {
            input: '$blogs',
            as: 'blog',
            cond: { $eq: [`$$blog.enabled`, true] },
          },
        },
      },
    },
    {
      $unwind: '$blogs',
    },
    {
      $group: {
        _id: '$name',
        blogCount: { $sum: 1 },
      },
    },
    {
      $sort: {
        blogCount: -1,
      },
    },
    {
      $project: {
        name: '$_id',
        _id: 0,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: mostPopularCategories,
  });
});

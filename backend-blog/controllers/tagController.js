const Tag = require('../models/tagModel');
const {
  deleteOne,
  createOne,
  updateOne,
} = require('../controllers/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.createTag = createOne(Tag);
exports.updateTag = updateOne(Tag);
exports.deleteTag = deleteOne(Tag);

exports.findAll = catchAsync(async (req, res, next) => {
  const tags = await Tag.find();

  return res.status(200).json({
    status: 'success',
    data: tags,
  });
});

// find most popular 4 tags!
exports.findMostPopular4Tags = catchAsync(async (req, res, next) => {
  const mostPopularTags = await Tag.aggregate([
    {
      $lookup: {
        from: 'blogs',
        localField: '_id',
        foreignField: 'tags',
        as: 'blogs',
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
      $limit: 4,
    },
    {
      $sort: { blogCount: -1 },
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
    data: mostPopularTags,
  });
});

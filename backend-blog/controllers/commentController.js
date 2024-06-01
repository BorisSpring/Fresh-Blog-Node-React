const catchAsync = require('../utils/catchAsync');
const Comment = require('../models/commentModel');
const Blog = require('../models/blogModel');
const AppError = require('../utils/appError');
const moment = require('moment');

const { findAll } = require('./handlerFactory');

exports.createComment = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.body.blogId);

  if (!blog)
    return next(
      new AppError(`There is no blog with id ${req.body.blogId}`, 404)
    );

  const comment = await Comment.create({
    comment: req.body.comment,
    user: req.user._id,
    blog: req.body.blogId,
  });

  if (!comment) return next(new AppError(`Fail to update comment`, 400));

  res.status(201).json({
    status: 'success',
    data: comment,
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment.user.equals(req.user._id))
    return next(
      new AppError('U dont have permission to update this comment!', 400)
    );

  comment.comment = req.body.comment;

  const updatedComment = await comment.save();

  res.status(200).json({
    status: 'success',
    data: { comment: updatedComment },
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment)
    return next(new AppError(`There is no comment with id ${req.params.id}`));

  if (req.user.role === 'admin' || req.user._id === comment.user) {
    await Comment.findByIdAndDelete(req.params.id);
  }

  res.status(204).json({
    status: 'success',
  });
});

exports.disabelEnableComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment)
    return next(
      new AppError(`There is no comment with id ${req.params.id}`, 404)
    );

  comment.enabled = !comment.enabled;

  await comment.save();

  res.status(200).json({
    status: 'success',
    message: `Comment has been ${comment.enabled ? 'enabled' : 'disabled'}`,
  });
});

exports.findAll = findAll(Comment, [
  { path: 'user', select: 'photo email id name' },
]);

exports.selectUserComments = (req, res, next) => {
  req.query.user = req.user._id;
  next();
};

exports.statsComments = catchAsync(async (req, res, next) => {
  const date = moment().subtract(7, 'days').toDate();

  const stats = await Comment.aggregate([
    {
      $match: {
        createdAt: { $gte: date },
      },
    },
    {
      $addFields: {
        commentDate: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
      },
    },
    {
      $group: {
        _id: '$commentDate',
        numberOfComments: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    stats,
  });
});

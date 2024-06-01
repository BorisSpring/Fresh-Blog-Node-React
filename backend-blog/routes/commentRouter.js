const express = require('express');
const {
  createComment,
  updateComment,
  deleteComment,
  disabelEnableComment,
  findAll,
  selectUserComments,
} = require('../controllers/commentController');
const { protect, restrictTo } = require('../controllers/authController');

const commentRouter = express.Router();

commentRouter.use(protect);

commentRouter.patch(
  '/disableEnable/:id',
  restrictTo('admin'),
  disabelEnableComment
);
commentRouter.get('/meComments', selectUserComments, findAll);

commentRouter.route('/:id').patch(updateComment).delete(deleteComment);

commentRouter.route('/').post(createComment).get(restrictTo('admin'), findAll);

module.exports = commentRouter;

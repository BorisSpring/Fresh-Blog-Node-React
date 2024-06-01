const express = require('express');
const {
  createTag,
  updateTag,
  deleteTag,
  findAll,
  findMostPopular4Tags,
} = require('../controllers/tagController');
const { protect, restrictTo } = require('../controllers/authController');

const tagRouter = express.Router();

tagRouter.route('/').get(findAll).post(protect, restrictTo('admin'), createTag);
tagRouter.get('/mostPopularTags', findMostPopular4Tags);

tagRouter.use(protect, restrictTo('admin'));
tagRouter.route('/:id').delete(deleteTag).patch(updateTag);

module.exports = tagRouter;

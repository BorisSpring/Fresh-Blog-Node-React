const express = require('express');

const {
  findMainPageBlogs,
  createBlog,
  uploadBlogImage,
  resizeBlogImage,
  deleteBlog,
  updateBlog,
  findSingleBlog,
  findMostViewedBlogs,
  findAllBlogs,
  findMainPageBlogsFilter,
  findLastFourEnabledBlogs,
  findAllBlogsMiddleware,
  allBlogs,
  statsCategory,
  statsTags,
} = require('../controllers/blogController');
const { statsComments } = require('../controllers/commentController');
const { protect, restrictTo } = require('../controllers/authController');

const blogRouter = express.Router();

blogRouter.get('/mostViewedBlogs', findMostViewedBlogs, findAllBlogs);
blogRouter.get('/lastFourEnabledBlogs', findLastFourEnabledBlogs, allBlogs);
blogRouter.get(
  '/allBlogs',
  protect,
  restrictTo('admin'),
  findAllBlogsMiddleware,
  findAllBlogs
);
blogRouter.get('/me', protect, findAllBlogsMiddleware, findAllBlogs);

// statistics for blogs
blogRouter.get(
  '/stats/categories',
  protect,
  restrictTo('admin'),
  statsCategory
);
blogRouter.get('/stats/tags', protect, restrictTo('admin'), statsTags);
blogRouter.get('/stats/comments', protect, restrictTo('admin'), statsComments);

blogRouter.get('/singleBlog/:slug', findSingleBlog);

blogRouter
  .route('/:id')
  .delete(protect, deleteBlog)
  .patch(protect, uploadBlogImage, resizeBlogImage, updateBlog);

blogRouter
  .route('/')
  .post(protect, uploadBlogImage, resizeBlogImage, createBlog)
  .get(findMainPageBlogsFilter, findMainPageBlogs);

module.exports = blogRouter;

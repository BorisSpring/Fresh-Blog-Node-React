const express = require('express');
const { restrictTo, protect } = require('../controllers/authController');
const {
  createCategory,
  findAllCategories,
  deleteCategory,
  updateCategory,
  findMost4PopularCategories,
} = require('../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.get('/', findAllCategories);
categoryRouter.get('/mostPopularCategories', findMost4PopularCategories);

categoryRouter.use(protect, restrictTo('admin'));
categoryRouter.route('/:id').delete(deleteCategory).patch(updateCategory);
categoryRouter.post('/', createCategory);

module.exports = categoryRouter;

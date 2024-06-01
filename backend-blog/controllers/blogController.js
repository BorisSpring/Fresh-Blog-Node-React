// libaries for images upload and resizing
const multer = require('multer');
const sharp = require('sharp');

// utils
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/APIFeatures');

// models
const Blog = require('../models/blogModel');
const Tag = require('../models/tagModel');
const Category = require('../models/categoryModel');

// factory methods
const { findAll } = require('../controllers/handlerFactory');

// function for images upload,resizing,filter
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Ony images are allowed', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadBlogImage = upload.single('photo');

exports.resizeBlogImage = catchAsync(async (req, res, next) => {
  if (req.file) {
    const fileName = `${req.user._id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/blogs/${fileName}`);

    req.body.image = fileName;
  }
  next();
});

// end function for images upload,resizing,filter

exports.findMainPageBlogsFilter = async (req, res, next) => {
  req.query.enabled = true;
  if (req.query.tag) {
    const tag = await Tag.find({ name: req.query.tag });
    req.query.tags = tag?.[0]?.id;
    delete req.query.tag;
  }
  if (req.query.category) {
    const category = await Category.find({ name: req.query.category });
    req.query.category = category?.id;
  }
  next();
};

// welcome page blog cards
exports.findMainPageBlogs = findAll(
  Blog,
  [{ path: 'user', select: 'name email photo isVerified' }],
  'title,image,createdAt,introduction,slug'
);

// main page blog with comment, user that posted comments, and all details
exports.findSingleBlog = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    req.query,
    Blog.findOne({ slug: req.params.slug, enabled: true })
  )
    .filter()
    .limitFields()
    .sort()
    .paginate();

  features.query.populate([
    { path: 'tags', select: 'name ' },
    { path: 'category', select: 'name' },
    {
      path: 'comments',
      select: 'comment createdAt id',
      populate: {
        path: 'user',
        select: 'email name photo  _id',
      },
      match: { enabled: true },
    },
  ]);

  const document = await features.query;

  if (!document?.length > 0) {
    next(new AppError('Blog doesnt exists!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: document?.[0],
  });
});

// this method is usefuly so we concat middleware and selecting blogs based on requirments
exports.findAllBlogs = findAll(Blog, [
  { path: 'user', select: 'name email photo isVerified' },
]);

exports.findAllBlogsMiddleware = async (req, res, next) => {
  if (req.user.role === 'user') {
    req.query.user = req.user._id;
  }
  req.query.fields = 'title id image createdAt slug enabled introduction user';
  next();
};

exports.allBlogs = findAll(Blog);

// 4 most viewed blogs sorted by views descending
exports.findMostViewedBlogs = (req, res, next) => {
  req.query.sort = '-views,-createdAt';
  req.query.limit = 4;
  req.query.fields = 'id views image title slug introduction';
  req.query.enabled = true;
  next();
};

exports.findLastFourEnabledBlogs = (req, res, next) => {
  req.query.limit = 4;
  req.query.fields = 'id views image title introduction slug createdAt';
  req.query.enabled = true;
  req.query.sort = '-createdAt';
  next();
};

// exporting validate category and tags so we can use late in update method also
// we are makeing two method so we divide logic for creating and updating
const validateCategory = async (category, next) => {
  if (category) {
    const selectedCategory = await Category.findOne({ _id: category });
    if (!selectedCategory) return next(new AppError('Invalid category!', 404));
  }
};
const validateTag = async (tags, next) => {
  if (tags) {
    const selectedTags = await Tag.find({ _id: { $in: tags } });
    if (selectedTags.length !== tags?.length)
      return next(new AppError('Invalid tag id!', 404));
  }
};

exports.createBlog = catchAsync(async (req, res, next) => {
  const blog = { ...req.body };

  blog.user = req.user._id;

  await validateCategory(blog.category, next);
  await validateTag(blog.tags, next);

  const newBlog = await Blog.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      document: newBlog,
    },
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  // console.log(req.body);
  if (!blog || (req.user.role !== 'admin' && blog.user !== req.user._id))
    return next(
      new AppError(
        !blog
          ? `Blog with id ${req.params.id} does not exist`
          : 'Fail to delete blog!',
        !blog ? 404 : 400
      )
    );
  await validateCategory(req.body.category, next);
  await validateTag(req.body.tags, next);

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      document: updatedBlog,
    },
  });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog || (req.user.role !== 'admin' && blog.user !== req.user._id))
    return next(
      new AppError(
        !blog
          ? `Blog with id ${req.params.id} does not exist`
          : 'Fail to delete blog!',
        !blog ? 404 : 400
      )
    );

  await Blog.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'Success',
  });
});

exports.statsCategory = catchAsync(async (req, res, next) => {
  const stats = await Blog.aggregate([
    {
      $lookup: {
        from: 'blogCategories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $group: {
        _id: '$category.name',
        blogPerCategory: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        totalBlog: { $sum: `$blogPerCategory` },
        blogPerCategory: { $push: '$$ROOT' },
      },
    },
    {
      $unwind: '$blogPerCategory',
    },
    {
      $project: {
        _id: { $first: '$blogPerCategory._id' },
        totalBlog: '$totalBlog',
        blogPerCategory: '$blogPerCategory.blogPerCategory',
      },
    },
    {
      $addFields: {
        percent: {
          $multiply: [{ $divide: ['$blogPerCategory', '$totalBlog'] }, 100],
        },
      },
    },
    {
      $sort: { percent: -1 },
    },
  ]);

  return res.status(200).json({
    status: 'Success',
    data: stats,
  });
});

exports.statsTags = catchAsync(async (req, res, next) => {
  const tagsStats = await Blog.aggregate([
    {
      $lookup: {
        from: 'blogTags',
        localField: 'tags',
        foreignField: '_id',
        as: 'tags',
      },
    },
    {
      $unwind: '$tags',
    },
    {
      $group: {
        _id: '$tags.name',
        tagPerCategory: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        totalBlogs: { $sum: '$tagPerCategory' },
        blogsWithTagId: { $push: '$$ROOT' },
      },
    },
    {
      $unwind: '$blogsWithTagId',
    },
    {
      $project: {
        _id: '$$ROOT.blogsWithTagId._id',
        totalBlogs: '$totalBlogs',
        tagPerCategory: '$blogsWithTagId.tagPerCategory',
      },
    },
    {
      $addFields: {
        percent: {
          $multiply: [{ $divide: ['$tagPerCategory', '$totalBlogs'] }, 100],
        },
      },
    },
    {
      $sort: { percent: -1 },
    },
  ]);

  return res.json({
    status: 'Success',
    data: tagsStats,
  });
});

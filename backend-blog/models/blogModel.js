const mongoose = require('mongoose');
const slugify = require('slugify');

// models
const Comment = require('./commentModel');

// schema
const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      minLength: [10, 'Minimum length is 10 characters!'],
      maxLength: [50, 'Maximum length is 50 characters!'],
      trim: true,
      unique: true,
    },
    slug: String,
    introduction: {
      type: String,
      required: [true, 'Title is required!'],
      minLength: [30, 'Minimum length is 30 characters!'],
      maxLength: [255, 'Maximum length is 255 characters!'],
      trim: true,
    },
    conclusion: {
      type: String,
      required: [true, 'Title is required!'],
      minLength: [30, 'Minimum length is 30 characters!'],
      maxLength: [255, 'Maximum length is 255 characters!'],
      trim: true,
    },
    body: {
      type: String,
      required: [true, 'Title is required!'],
      minLength: [10, 'Minimum length is 10 characters!'],
      maxLength: [1000, 'Maximum length is 1000 characters!'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required!'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [mongoose.Schema.ObjectId],
      ref: 'Tag',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, rel) {
        delete rel['_id'];
        delete rel['__V'];
      },
    },
    toObject: { virtuals: true },
  }
);

// populating comments and user that writed comments
BlogSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'blog',
  options: {
    select: 'user  comment createdAt enabled',
    match: { enabled: true },
    populate: { path: 'user', select: 'image name email' },
  },
});

// slugify title affter document is created or title is updated

BlogSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title);
  }
  next();
});

// deleting comment affter deleting the blogs
BlogSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Comment.deleteMany({ blog: doc._id });
  }
});

// if is updated we are setting updated time to the current time
BlogSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;

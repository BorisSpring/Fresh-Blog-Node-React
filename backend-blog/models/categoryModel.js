const mongoose = require('mongoose');
const Blog = require('./blogModel');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      minLength: [3, 'Min length is 3 charachters!'],
      maxLength: [15, 'Maximum length is 15 charachters!'],
      trim: true,
      unique: true,
      lowerCase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, rel) {
        delete rel['_id'];
        delete rel['__v'];
      },
    },
  }
);

categorySchema.index({ name: 1 });

// setting updated time affter peforming update operation
categorySchema.pre('save', function (next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

//deleting categories reference from blogs affter deleting category
categorySchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Blog.updateMany({ category: doc._id }, { $unset: { category: '' } });
  }
});

const Category = mongoose.model('Category', categorySchema, 'blogCategories');

module.exports = Category;

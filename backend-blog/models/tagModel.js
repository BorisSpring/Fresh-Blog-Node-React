const mongoose = require('mongoose');
const Blog = require('./blogModel');

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      lowerCase: true,
      unique: true,
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
    toObject: { virtuals: true },
  }
);

// setting updated time affter peforming update operation
tagSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

// deleting and tags reference on the blog affter peforming delete operation!
tagSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Blog.updateMany({ tags: doc._id }, { $pull: { tags: doc._id } });
  }
});

const Tag = mongoose.model('Tag', tagSchema, 'blogTags');

module.exports = Tag;

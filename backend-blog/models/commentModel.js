const mongoose = require(`mongoose`);

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      trim: true,
      minLength: [6, 'Minimum comment length is 6 characters'],
      maxLength: [255, 'Maximum comment length is 255 characters'],
      required: [true, 'Comment is required!'],
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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog',
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

// chaning updated at affter peforming some changes on comment
commentSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

const Comment = mongoose.model('Comment', commentSchema, 'blogComments');

module.exports = Comment;

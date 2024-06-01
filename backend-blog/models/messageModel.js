const mongoose = require('mongoose');
const validator = require('validator');

const messageSchema = mongoose.Schema(
  {
    isRead: {
      type: 'boolean',
      default: false,
    },
    from: {
      type: String,
      validate: [validator.isEmail, 'Email is required!'],
      required: [true, 'Email is required!'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required!'],
      minLength: [10, 'Minimum length is 10 characters for subject'],
      maxLength: [255, 'Maximum length is 255 characters for subject'],
    },
    message: {
      type: String,
      minLength: [5, 'Message must be at least 5 characters long'],
      maxLength: [255, 'Message must be at least 255 characters long'],
      required: [true, 'Message is required!'],
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

// setting document middleware for updateing update time affter makeing some changes to the document
messageSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

const Message = mongoose.model('Message', messageSchema, 'blogMessages');

module.exports = Message;

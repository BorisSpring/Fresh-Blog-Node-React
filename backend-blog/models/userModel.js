const mongoose = require(`mongoose`);
const validator = require(`validator`);
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// importing models to pefrom delete operations
const Comment = require('./commentModel');
const Blog = require('./blogModel');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required!'],
      trim: true,
      minLength: [2, 'Minimum length for name is 2 characters'],
      maxLength: [25, `Maximum length for name is 25 characters`],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required!'],
      validate: [validator.isEmail, 'Please provide valid email'],
      unique: true,
      lowerCase: true,
    },
    photo: {
      type: String,
      default: 'default.jpg',
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      minLength: [8, 'Password must be at least 8 characters long'],
      maxLength: [100, 'Password must be at most 16 characters long'],
      trim: true,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Password is required!'],
      minLength: [8, 'Password must be at least 8 characters long'],
      maxLength: [100, 'Password must be at most 100 characters long'],
      trim: true,
      validate: {
        validator: function (value) {
          return value == this.password;
        },
        message: 'Password must match!',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verifyToken: String,
    role: {
      type: String,
      required: [true, 'Role is required!'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, rel) {
        rel.id = rel._id;
        delete rel._id;
        delete rel.__v;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// removing user comments and blogs affter deleting the user
userSchema.post('findOneAndDelete', async function (doc, next) {
  if (doc) {
    await Comment.deleteMany({ user: doc.id });
    await Blog.deleteMany({ user: doc.id });
  }
  next();
});

// dodati psole verify token na kraju kad se doda mailing
// userSchema.pre('save', async function (next) {
//     if(this.isNew) {
//       this.verifyToken =
//     }
// })

// if password is changed we are hasing and removing password confirm
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }
  next();
});

// if passowrd is modified and not net document we are setting password changed at
userSchema.pre('save', async function (next) {
  if (this.isModified('password') && !this.isNew) {
    this.passwordChangedAt = Date.now() - 5000;
  }
  next();
});

// validating user password
userSchema.methods.checkPassword = async function (
  userInputPassword,
  hashedPassword
) {
  return await bcrypt.compare(userInputPassword, hashedPassword);
};

// checking if jwt is issued before changin password if password is changed
userSchema.methods.checkIfJwtIssuedBeforeChaningPassword = async function (
  JwtTimestamp
) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JwtTimestamp < changedTimestamp;
  }
  return false;
};

// creating password reset token
userSchema.methods.createPasswordResetToken = async function () {
  const token = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = await crypto
    .createHash('sha-256')
    .update(token)
    .digest('hex');
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return token;
};

// crypting token so we can compare saved and received token
userSchema.methods.cryptToken = function (token) {
  return crypto.createHash('sha-256').update(token).digest('hex');
};

userSchema.methods.createVerifyToken = async function () {
  const token = crypto.randomBytes(32).toString(`hex`);
  this.verifyToken = crypto.createHash('sha-256').update(token).digest('hex');
  return token;
};

const User = mongoose.model('User', userSchema, 'blogUsers');

module.exports = User;

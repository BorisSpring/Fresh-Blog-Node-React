const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { deleteUserImage } = require('../utils/deleteFile');
const { findAll, deleteOne } = require('./handlerFactory');

// const { signInAndSendToken } = require('../controllers/authController');

// multer storage and file filter for uploaded user images
const multerStorage = multer.memoryStorage();

// multer filter for approving only images files!
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError('Only images allowed!', 400), false);
  }
};

// uplaod method for user picture
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeAndAddPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please provide image', 400));
  }
  req.file.filename = `${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(120, 120)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  req.user.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { photo: req.file.filename },
    { new: true, runValidators: false }
  );

  if (!updatedUser) {
    await deleteUserImage(req.file.filename);
    return next(new AppError('Fail to update user image!', 400));
  }

  res.status(200).json({
    status: 'success',
  });
});

exports.banUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('+isBanned');

  if (!user) {
    return next(new AppError('User not found!', 404));
  }

  user.isBanned = !user.isBanned;

  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    message: `User has been ${user.isBanned ? '' : 'un'} banned`,
  });
});

exports.findAllUsers = findAll(
  User,
  null,
  'name createdAt email  photo role isVerified isBanned isActive '
);
exports.deleteUser = deleteOne(User);

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });
  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.verifyAccount = catchAsync(async (req, res, next) => {
  if (req.user?.verifyToken === req.params.token) {
    req.user.verifyToken = undefined;
    req.user.isVerified = true;
    req.user.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    status: 'success',
    message: 'Account has been verified successfully!',
  });
});

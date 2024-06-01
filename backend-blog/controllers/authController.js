const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const Email = require('../utils/email');

// signing token with payload of user id
const signToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// sending token function so we remove redudant same code in multiple places
exports.signInAndSendToken = (user, statusCode, req, res) => {
  const token = signToken({ id: user._id });
  user.password = undefined;

  res.status(statusCode).json({
    status: 'Success',
    token,
    user,
  });
};

// registering new user form site
exports.signUp = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, name } = req.body;

  // this one i add so we dont run unnecessary query to a database
  if (
    !email ||
    !password ||
    password.trim().length < 8 ||
    !passwordConfirm === password ||
    !name ||
    name.trim().length < 2
  ) {
    return next(new AppError('All Fields are required!', 400));
  }

  // created new user
  const createdUser = await User.create({
    email,
    password,
    passwordConfirm,
    name,
    role: 'user',
  });

  await createdUser.createVerifyToken();
  await createdUser.save({ validateBeforeSave: false });

  try {
    const urlForUpdatingPhoto = `${req.get('origin')}/dashboard/settings`;
    await new Email(createdUser, urlForUpdatingPhoto).sendWelcome();

    const urlForVerifyingAccount = `${urlForUpdatingPhoto}/${createdUser.verifyToken}`;
    await new Email(createdUser, urlForVerifyingAccount).sendVerify();
  } catch (error) {
    await User.findByIdAndDelete(createdUser._id);
    return next(
      new AppError(
        'Fail to send verification email!Please Try To register again later! Thank you!',
        400
      )
    );
  }

  // sending token back to the user with required informations
  this.signInAndSendToken(createdUser, 201, req, res);
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // checking for email and password
  if (!email || !password) {
    return next(new AppError('All Fields are required!', 400));
  }

  // selecting user with that email
  const user = await User.findOne({ email }).select(
    '+password +isActive +isBanned'
  );

  // checking if existing and if password match input password
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Invalid username or password!', 400));
  }

  // checking if user is banned
  if (user.isBanned) {
    return next(new AppError('You have been banned!', 400));
  }

  // checking if user was inactive if so are we makeing him active again
  if (!user.isActive) {
    user.isActive = true;
    const activatedUser = await user.save({ validateBeforeSave: false });
    if (!activatedUser)
      return next(new AppError('Please try login again!', 400));
  }

  this.signInAndSendToken(user, 200, req, res);
});

// restricting route to certain roles!
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // checking if user role is in roles array if not returning 403 status code with error message
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You dont have permission', 403));
    }
    next();
  };
};

// checking for authentication token
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  // if headers authorization not start with bearer return 401
  if (!authHeader?.startsWith?.('Bearer ')) {
    return next(new AppError('Invalid token received', 401));
  }

  // spliting to get pure token
  token = authHeader.split(' ')[1];

  // decoding token so we can have request user id
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // finding request user
  const requestUser = await User.findById(decodedToken.id);

  if (
    !requestUser ||
    (await requestUser.checkIfJwtIssuedBeforeChaningPassword(decodedToken.iat))
  ) {
    return next(new AppError('Invalid token received', 401));
  }

  // posting request user to request body and calling next
  req.user = requestUser;
  next();
});

// add emailing later at the end of the project
exports.requestPasswordResetToken = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // checking for req body email
  if (!email) {
    return next(new AppError('Email is required!'));
  }

  // finding user with request email
  const userFromRequestEmail = await User.findOne({ email });

  // if no user with email addres returning error maybe we coudl just reutrn message instead of giving user information that there is no accoutn with current email address
  if (!userFromRequestEmail) {
    return next(new AppError('Invalid email address!'));
  }

  // creating resetToken
  const passwordResetToken =
    await userFromRequestEmail.createPasswordResetToken();

  await userFromRequestEmail.save({ validateBeforeSave: false });

  try {
    const resetUrl = `${req.get(
      'origin'
    )}/forgotpassword/${passwordResetToken}`;
    console.log(resetUrl);
    new Email(userFromRequestEmail, resetUrl).sendPasswordReset();
  } catch (error) {
    userFromRequestEmail.passwordResetToken = undefined;
    userFromRequestEmail.passwordResetTokenExpires = undefined;
    await userFromRequestEmail.save();
    return next(new AppError('Fail to send reset token to email!', 400));
  }

  res.status(200).json({
    status: 'Success',
    message: 'Token has been sent to the email address',
    passwordResetToken,
  });
});

// reseting password with a given token!
exports.resetPasswordWithToken = catchAsync(async (req, res, next) => {
  // crypting token so we can find user by database crypted token
  const token = await crypto
    .createHash('sha-256')
    .update(req.params.token)
    .digest(`hex`);

  // foudn user from request token
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gte: Date.now() },
  });

  // if no user throwing error
  if (!user) return next(new AppError('Invalid reset token received!', 400));

  // setting password to found user
  const { password, passwordConfirm } = req.body;
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;

  // updating user
  const updatedUser = await user.save();

  // sending a new jwt
  this.signInAndSendToken(updatedUser, 200, req, res);
});

// chaning user password
exports.changePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, password, passwordConfirm } = req.body;

  if (!oldPassword || !password || !passwordConfirm) {
    return next(new AppError('All fields are required!', 400));
  } else if (password !== passwordConfirm) {
    return next(new AppError('Password must match!', 400));
  }

  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.checkPassword(oldPassword, user.password))) {
    return next(new AppError('Invalid password'));
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;

  await user.save();
  this.signInAndSendToken(user, 200, req, res);
});

// deactivating account
exports.deactiveMe = catchAsync(async (req, res, next) => {
  const deactivatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      isActive: false,
      passwordChangedAt: Date.now(),
    },
    { new: true }
  );

  if (!deactivatedUser) {
    return next(new AppError('Fail to deactive account try again!'), 400);
  }

  res.status(200).json({
    status: 'success',
    message: 'Account has been deactivated',
  });
});

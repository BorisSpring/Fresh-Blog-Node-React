const express = require(`express`);
const {
  signUp,
  signIn,
  requestPasswordResetToken,
  resetPasswordWithToken,
  changePassword,
  protect,
  restrictTo,
  deactiveMe,
} = require('../controllers/authController');

const {
  banUser,
  uploadUserPhoto,
  resizeAndAddPhoto,
  findAllUsers,
  deleteUser,
  getMe,
  verifyAccount,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/all', protect, restrictTo('admin'), findAllUsers);
userRouter.post('/signIn', signIn);
userRouter.post('/signUp', signUp);
userRouter.patch('/verify/:token', protect, verifyAccount);
userRouter.patch('/resetPassword/:token', protect, resetPasswordWithToken);
userRouter.post('/resetPassword', requestPasswordResetToken);
userRouter.patch('/banUser/:id', protect, restrictTo('admin'), banUser);
userRouter.patch('/deactivateMe', protect, deactiveMe);
userRouter.patch('/changePassword', protect, changePassword);
userRouter.patch('/updatePicture', protect, uploadUserPhoto, resizeAndAddPhoto);
userRouter.get('/me', protect, getMe);
userRouter.route('/:id').delete(protect, restrictTo('admin'), deleteUser);
module.exports = userRouter;

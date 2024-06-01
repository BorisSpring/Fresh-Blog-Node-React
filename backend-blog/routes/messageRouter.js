const express = require('express');

const {
  findAllMessages,
  deleteMessage,
  updateOne,
  sendMessage,
} = require('../controllers/messageController');
const { protect, restrictTo } = require('../controllers/authController');

const messageRouter = express.Router();

messageRouter.post('/', sendMessage);

// messageRouter.use(protect, restrictTo('admin'));

messageRouter.get('/', findAllMessages);
messageRouter.route('/:id').patch(updateOne).delete(deleteMessage);

module.exports = messageRouter;

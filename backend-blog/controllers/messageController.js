const Message = require('../models/messageModel');
const {
  deleteOne,
  createOne,
  updateOne,
  findAll,
} = require('../controllers/handlerFactory');

exports.findAllMessages = findAll(Message);
exports.deleteMessage = deleteOne(Message);
exports.updateOne = updateOne(Message);
exports.sendMessage = createOne(Message);

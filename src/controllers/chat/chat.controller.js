const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { chatService } = require('../../services/chat/index');

const getConversations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await chatService.queryConversations(filter, options);
  res.send(result);
});

const getConversation = catchAsync(async (req, res) => {
  const conversation = await chatService.getConversationById(req.params.conversationId);
  if (!conversation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Conversation not found');
  }
  res.send(conversation);
});

const sendMessage = catchAsync(async (req, res) => {
  const user = req.user;
  const message = await chatService.sendMessage(user._id, req.body.receiverId, req.body.message);
  res.status(httpStatus.OK).send(message);
});

const getMessages = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['receiverId']);
  const user = req.user;
  const messages = await chatService.getMessages(user._id, filter.receiverId);
  res.status(httpStatus.OK).send(messages);
});

const getUserConversations = catchAsync(async (req, res) => {
  const user = req.user;
  const conversations = await chatService.getUserConversations(user._id);
  res.send(conversations);
});

module.exports = {
  getConversations,
  getConversation,
  sendMessage,
  getMessages,
  getUserConversations,
};

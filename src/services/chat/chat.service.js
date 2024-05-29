const httpStatus = require('http-status');

// userservice import
const { User } = require('../../models');
const config = require('../../config/config');

const uuidv4 = require('uuid');
const Pusher = require('pusher');

const { Conversation, Message } = require('../../models/chat');
const ApiError = require('../../utils/ApiError');

const appId = '1732720';
const key = '1fa5c190fd5ae5085ba8';
const secret = '42b5bcabdc85f26511ac';
const cluster = 'eu';


// const appId = config.pusher.appId;
// const key = config.pusher.key;
// const secret = config.pusher.secret;
// const cluster = config.pusher.cluster;

const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
  useTLS: true,
});

const queryConversations = async (filter, options) => {
  const conversations = await Conversation.paginate(filter, options);
  return conversations;
};

const getConversationById = async (id) => {
  return Conversation.findById(id);
};

const sendMessage = async (senderId, receiverId, messageBody) => {
  const conversation = await Conversation.findOne({
    users: { $all: [senderId, receiverId] },
  });
  if (!conversation) {
    console.log('conversation not found');
    console.log('senderId', senderId);
    console.log('receiverId', receiverId);
    console.log('messageBody', messageBody);

    // sender id find user name
    // receiver id find user name
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    console.log('sender', sender.role);
    console.log('receiver', receiver.role);
    var parent = false;
    if (sender.role === 'parent') {
      const temp = senderId;
      senderId = receiverId;
      receiverId = temp;
      parent = true;

      // create new conversation
      const channel = uuidv4.v4();
      const newConversation = await Conversation.create({
        channel,
        users: [senderId, receiverId],
      });

      // create new message
      const message = await Message.create({
        conversation: newConversation._id,
        sender: receiverId,
        receiver: senderId,
        send_at: Date.now(),
        text: messageBody.text,
        type: messageBody.type,
        media: messageBody.media,
      });

      // pusher trigger
      pusher.trigger(channel, 'new-message', {
        message,
      });

      // update conversation
      newConversation.messages.push(message._id);
      await newConversation.save();

      return message;
    }

    // create new conversation
    const channel = uuidv4.v4();
    const newConversation = await Conversation.create({
      channel,
      users: [senderId, receiverId],
    });

    // create new message
    const message = await Message.create({
      conversation: newConversation._id,
      sender: senderId,
      receiver: receiverId,
      send_at: Date.now(),
      text: messageBody.text,
      type: messageBody.type,
      media: messageBody.media,
    });

    // pusher trigger
    pusher.trigger(channel, 'new-message', {
      message,
    });

    // update conversation
    newConversation.messages.push(message._id);
    await newConversation.save();

    return message;
  }

  console.log('conversation found');
  
  // const sender = await User.findById(senderId);
  // const receiver = await User.findById(receiverId);
  // console.log('sender', sender.role);
  // console.log('receiver', receiver.role);
  // create new message
  const message = await Message.create({
    conversation: conversation._id,
    sender: senderId,
    receiver: receiverId,
    send_at: Date.now(),
    text: messageBody.text,
    type: messageBody.type,
    media: messageBody.media,
  });

  // pusher trigger

  pusher.trigger(conversation.channel, 'new-message', {
    message,
  });

  // update conversation
  conversation.messages.push(message._id);
  await conversation.save();

  return message;
};

const getMessages = async (senderId, receiverId) => {
  const conversation = await Conversation.findOne({
    users: { $all: [senderId, receiverId] },
  }).populate('messages');
  if (!conversation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Conversation not found');
  }
  return conversation.messages;
};

const getUserConversations = async (userId) => {
  // populate last message
  // populate users
  const userConversations = await Conversation.find({ users: { $all: [userId] } })
    .populate({
      path: 'messages',
      options: { sort: { send_at: -1 }, limit: 1 },
    })
    .populate('users');
  return userConversations;
};

module.exports = {
  queryConversations,
  getConversationById,
  sendMessage,
  getMessages,
  getUserConversations,
};

const Joi = require('joi');
const { objectId } = require('../custom.validation');

const getConversations = {
  query: Joi.object().keys({
    user: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getConversation = {
  params: Joi.object().keys({
    conversationId: Joi.string().custom(objectId),
  }),
};

const sendMessage = {
    body: Joi.object().keys({
        receiverId: Joi.string().custom(objectId),
        message: Joi.object().keys({
            text: Joi.string().required(),
            type: Joi.string().required(),
        }),
    }),
    };

const getMessages = {
  query: Joi.object().keys({
    receiverId: Joi.string().custom(objectId),
  }),
};

const getUserConversations = {
  query: Joi.object().keys({
    user: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getConversations,
  getConversation,
  sendMessage,
  getMessages,
  getUserConversations,
};

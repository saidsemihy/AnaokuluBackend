const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const chatController = require('../../../controllers/chat/chat.controller');
const chatValidation = require('../../../validations/chat/chat.validation');

const router = express.Router();

// get list conversations
router.route('/conversations/').get(auth(), validate(chatValidation.getConversations), chatController.getConversations);

// get conversation by id
router
  .route('/conversations/:conversationId')
  .get(auth(), validate(chatValidation.getConversation), chatController.getConversation);

// teacherler okula göre listelerken doğru ->
// parent teacherları görüntülerken get -> v1/teachers?school=5f8d5f4d7f4bfc2a3c1f2b9d

// parentlar teachera göre listelenirken doğru ->
// teacher parentları görüntülerken get -> /v1/teachers/658353282e9b552c7fca071d/parents
// v1/parents?school=5f8d5f4d7f4bfc2a3c1f2b9d

// post -> v1/chat/send-message body -> receiverId, message
router.route('/send-message').post(auth(),validate(chatValidation.sendMessage), chatController.sendMessage);

// get -> v1/chat/messages -> query -> userId
router.route('/messages').get(auth(), validate(chatValidation.getMessages), chatController.getMessages);

router
  .route('/user-conversations')
  .get(auth(), validate(chatValidation.getUserConversations), chatController.getUserConversations);

module.exports = router;

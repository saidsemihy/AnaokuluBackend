const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const conversationSchema = mongoose.Schema(
  {
    // pusher channel name
    channel: {
      type: 'String',
    },
    users: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
    ],
    messages: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Message',
      },
    ],
  },
  {
    timestamps: true,
  },
);

conversationSchema.plugin(toJSON);
conversationSchema.plugin(paginate);

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;

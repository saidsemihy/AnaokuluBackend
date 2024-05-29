const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const messageSchema = mongoose.Schema(
  {
    conversation: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Conversation',
    },
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    send_at: {
      type: 'Date',
    },
    text: {
      type: 'String',
    },
    //
    type: {
      type: 'String',
      enum: ['text', 'image', 'video', 'file'],
    },
    // aws s3 key
    media: {
      type: 'String',
    },
  },
  {
    timestamps: true,
  },
);

messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

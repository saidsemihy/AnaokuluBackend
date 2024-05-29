const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const otpSchema = mongoose.Schema(
  {
    token: {
      ref: 'Token',
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
otpSchema.plugin(toJSON);

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;

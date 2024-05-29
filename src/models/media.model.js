const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const mediaSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'School',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
mediaSchema.plugin(toJSON);
mediaSchema.plugin(paginate);

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;

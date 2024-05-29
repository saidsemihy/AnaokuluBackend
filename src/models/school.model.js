const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const schoolSchema = mongoose.Schema(
  {
    name: {
      type: 'String',
    },
    address: {
      type: 'String',
    },
    phone: {
      type: 'String',
    },
    email: {
      type: 'String',
    },
    website: {
      type: 'String',
    },
    logo: {
      type: 'String',
    },
    schoolmanager: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Schoolmanager',
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

schoolSchema.plugin(toJSON);
schoolSchema.plugin(paginate);

const School = mongoose.model('School', schoolSchema);

module.exports = School;

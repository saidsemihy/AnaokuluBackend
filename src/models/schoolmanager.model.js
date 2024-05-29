const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const schoolManagerSchema = mongoose.Schema(
  {
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'School',
      default: null,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

schoolManagerSchema.plugin(toJSON);
schoolManagerSchema.plugin(paginate);

const SchoolManager = mongoose.model('Schoolmanager', schoolManagerSchema);

module.exports = SchoolManager;

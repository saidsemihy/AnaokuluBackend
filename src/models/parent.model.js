const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const parentSchema = mongoose.Schema(
  {
    students: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Student',
      },
    ],
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'School',
    },
  },
  {
    timestamps: true,
  },
);

parentSchema.plugin(toJSON);
parentSchema.plugin(paginate);

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;

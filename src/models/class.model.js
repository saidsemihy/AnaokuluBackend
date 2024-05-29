const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const classSchema = mongoose.Schema(
  {
    name: {
      type: 'String',
    },
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'School',
    },
    teacher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Teacher',
      default: null,
    },

    students: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Student',
      },
    ],
  },
  {
    timestamps: true,
  },
);

classSchema.plugin(toJSON);
classSchema.plugin(paginate);

const Class = mongoose.model('Class', classSchema);

module.exports = Class;

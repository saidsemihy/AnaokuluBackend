const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const teacherSchema = mongoose.Schema(
  {
    gender: {
      type: String,
    },
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'School',
    },
    classes: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Class',
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

teacherSchema.plugin(toJSON);
teacherSchema.plugin(paginate);

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;

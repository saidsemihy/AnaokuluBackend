const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: String,
    },
    parent: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Parent',
      default: null,
    },
    gender: {
      type: String,
    },
    classes: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Class',
      default: null,
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

studentSchema.plugin(toJSON);
studentSchema.plugin(paginate);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

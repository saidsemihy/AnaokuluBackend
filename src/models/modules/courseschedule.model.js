const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const courseScheduleSchema = mongoose.Schema(
  {
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    course: {
      type: String,
    },
    teacher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Teacher',
      default: null,
    },
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'School',
    },
    classes: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Class',
    },
  },
  {
    timestamps: true,
  },
);

courseScheduleSchema.plugin(toJSON);
courseScheduleSchema.plugin(paginate);

const CourseSchedule = mongoose.model('CourseSchedule', courseScheduleSchema);

module.exports = CourseSchedule;

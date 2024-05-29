const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const calendarSchema = mongoose.Schema(
  {
    lessonName: {
      type: String,
      required: true,
    },
    nameOfDay: {
      type: Number,
      required: true,
    },
    hour: {
      type: Number,
    },
    minute: {
      type: Number,
    },
    lessonDuration: {
      type: Number,
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
  },
  {
    timestamps: true,
  },
);

calendarSchema.plugin(toJSON);
calendarSchema.plugin(paginate);

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;

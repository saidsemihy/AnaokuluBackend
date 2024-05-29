const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const dailyReportSchema = mongoose.Schema(
  {
    date: {
      type: Date,
    },
    content: {
      type: String,
    },
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Student',
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

dailyReportSchema.plugin(toJSON);
dailyReportSchema.plugin(paginate);

const DailyReport = mongoose.model('DailyReport', dailyReportSchema);

module.exports = DailyReport;

const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const medicineTrackSchema = mongoose.Schema(
  {
    date: {
      type: Date,
    },
    medicine: {
      type: String,
    },
    detail: {
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

medicineTrackSchema.plugin(toJSON);
medicineTrackSchema.plugin(paginate);

const MedicineTrack = mongoose.model('MedicineTrack', medicineTrackSchema);

module.exports = MedicineTrack;

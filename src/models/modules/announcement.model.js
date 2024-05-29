const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const announcementSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'School',
    },
    class: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Class',
    },
  },
  {
    timestamps: true,
  },
);

announcementSchema.plugin(toJSON);
announcementSchema.plugin(paginate);

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;

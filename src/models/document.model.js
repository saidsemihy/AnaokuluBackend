const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const documentSchema = mongoose.Schema(
  {
    name: {
      type: 'String',
    },
    type: {
      type: 'String',
    },
    url: {
      type: 'String',
    },
    classes: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Class',
    },
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'School',
    },
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Student',
    },
  },
  {
    timestamps: true,
  },
);

documentSchema.plugin(toJSON);
documentSchema.plugin(paginate);

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;

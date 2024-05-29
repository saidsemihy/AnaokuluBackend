const Joi = require('joi');
const { objectId } = require('../custom.validation');

const createMedicineTrack = {
  body: Joi.object().keys({
    date: Joi.date(),
    medicine: Joi.string(),
    detail: Joi.string(),
    student: Joi.string().custom(objectId).required(),
    school: Joi.string().custom(objectId).required(),
  }),
};

const getMedicineTracks = {
  query: Joi.object().keys({
    school: Joi.string().custom(objectId),
    student: Joi.string().custom(objectId),
    date: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMedicineTrack = {
  params: Joi.object().keys({
    medicineTrackId: Joi.string().custom(objectId),
  }),
};

const updateMedicineTrack = {
  params: Joi.object().keys({
    medicineTrackId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      date: Joi.date(),
      medicine: Joi.string(),
      detail: Joi.string(),
      student: Joi.string().custom(objectId),
      school: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteMedicineTrack = {
  params: Joi.object().keys({
    medicineTrackId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMedicineTrack,
  getMedicineTracks,
  getMedicineTrack,
  updateMedicineTrack,
  deleteMedicineTrack,
};

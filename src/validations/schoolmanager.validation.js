const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSchoolManager = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  }),
};

const getSchoolManagers = {
  query: Joi.object().keys({
    user: Joi.string().custom(objectId),
    school: Joi.string().custom(objectId),
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSchoolManager = {
  params: Joi.object().keys({
    schoolmanagerId: Joi.string().custom(objectId),
  }),
};

const updateSchoolManager = {
  params: Joi.object().keys({
    schoolmanagerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
    })
    .min(1),
};

const deleteSchoolManager = {
  params: Joi.object().keys({
    schoolmanagerId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSchoolManager,
  getSchoolManagers,
  getSchoolManager,
  updateSchoolManager,
  deleteSchoolManager,
};

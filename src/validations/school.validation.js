const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSchool = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    website: Joi.string(),
    logo: Joi.string(),
  }),
};

const getSchools = {
  query: Joi.object().keys({
    schoolmanager: Joi.string().custom(objectId),
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSchool = {
  params: Joi.object().keys({
    schoolId: Joi.string().custom(objectId),
  }),
};

const updateSchool = {
  params: Joi.object().keys({
    schoolId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      address: Joi.string(),
      phone: Joi.string(),
      email: Joi.string().email(),
      website: Joi.string(),
      logo: Joi.string(),
    })
    .min(1),
};

const deleteSchool = {
  params: Joi.object().keys({
    schoolId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  deleteSchool,
};

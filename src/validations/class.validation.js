const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createClass = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    school: Joi.string().custom(objectId).required(),
  }),
};

const getClasses = {
  query: Joi.object().keys({
    school: Joi.string().custom(objectId),
    teacher: Joi.string().custom(objectId),
    students: Joi.string().custom(objectId),
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getClass = {
  params: Joi.object().keys({
    classId: Joi.string().custom(objectId),
  }),
};

const updateClass = {
  params: Joi.object().keys({
    classId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      school: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteClass = {
  params: Joi.object().keys({
    classId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass,
};

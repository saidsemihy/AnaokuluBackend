const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createParent = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    school: Joi.string().custom(objectId).required(),
  }),
};

const getParents = {
  query: Joi.object().keys({
    user: Joi.string().custom(objectId),
    students: Joi.string().custom(objectId),
    school: Joi.string().custom(objectId),
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getParent = {
  params: Joi.object().keys({
    parentId: Joi.string().custom(objectId),
  }),
};

const updateParent = {
  params: Joi.object().keys({
    parentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      school: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteParent = {
  params: Joi.object().keys({
    parentId: Joi.string().custom(objectId),
  }),
};

const getTeachers = {
  params: Joi.object().keys({
    parentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createParent,
  getParents,
  getParent,
  updateParent,
  deleteParent,
  getTeachers,
};

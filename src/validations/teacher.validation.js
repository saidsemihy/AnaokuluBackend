const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTeacher = {
  body: Joi.object().keys({
    gender: Joi.string(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    school: Joi.string().custom(objectId).required(),
  }),
};

const getTeachers = {
  query: Joi.object().keys({
    school: Joi.string().custom(objectId),
    classes: Joi.string().custom(objectId),
    user: Joi.string().custom(objectId),
    gender: Joi.string(),
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTeacher = {
  params: Joi.object().keys({
    teacherId: Joi.string().custom(objectId),
  }),
};

const updateTeacher = {
  params: Joi.object().keys({
    teacherId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      gender: Joi.string(),
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      school: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteTeacher = {
  params: Joi.object().keys({
    teacherId: Joi.string().custom(objectId),
  }),
};

const getStudents = {
  params: Joi.object().keys({
    teacherId: Joi.string().custom(objectId),
  }),
};

const getParents = {
  params: Joi.object().keys({
    teacherId: Joi.string().custom(objectId),
  }),
};



module.exports = {
  createTeacher,
  getTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  getStudents,
  getParents,
};

const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createStudent = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.string(),
    gender: Joi.string(),
    school: Joi.string().custom(objectId).required(),
  }),
};

const getStudents = {
  query: Joi.object().keys({
    parent: Joi.string().custom(objectId),
    school: Joi.string().custom(objectId),
    classes: Joi.string().custom(objectId),
    gender: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

const updateStudent = {
  params: Joi.object().keys({
    studentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      age: Joi.string(),
      gender: Joi.string(),
      school: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};

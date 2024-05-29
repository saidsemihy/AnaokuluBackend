const Joi = require('joi');
const { objectId } = require('../custom.validation');

const createCourseSchedule = {
  body: Joi.object().keys({
    date: Joi.date(),
    time: Joi.string(),
    course: Joi.string(),
    teacher: Joi.string().custom(objectId),
    school: Joi.string().custom(objectId).required(),
    classes: Joi.string().custom(objectId),
  }),
};

const getCourseSchedules = {
  query: Joi.object().keys({
    school: Joi.string().custom(objectId),
    teacher: Joi.string().custom(objectId),
    classes: Joi.string().custom(objectId),
    date: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCourseSchedule = {
  params: Joi.object().keys({
    courseScheduleId: Joi.string().custom(objectId),
  }),
};

const updateCourseSchedule = {
  params: Joi.object().keys({
    courseScheduleId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      date: Joi.date(),
      time: Joi.string(),
      course: Joi.string(),
      teacher: Joi.string().custom(objectId),
      school: Joi.string().custom(objectId),
      classes: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteCourseSchedule = {
  params: Joi.object().keys({
    courseScheduleId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCourseSchedule,
  getCourseSchedules,
  getCourseSchedule,
  updateCourseSchedule,
  deleteCourseSchedule,
};

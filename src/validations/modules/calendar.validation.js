const Joi = require('joi');
const { objectId } = require('../custom.validation');

const createCalendar = {
  body: Joi.object().keys({
    lessonName: Joi.string(),
    nameOfDay: Joi.number(),
    hour: Joi.number(),
    minute: Joi.number(),
    lessonDuration: Joi.number(),
    school: Joi.string().custom(objectId).required(),
    classes: Joi.string().custom(objectId),
  }),
};

const getCalendars = {
  query: Joi.object().keys({
    school: Joi.string().custom(objectId),
    classes: Joi.string().custom(objectId),
    lessonName: Joi.string(),
    nameOfDay: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCalendar = {
  params: Joi.object().keys({
    calendarId: Joi.string().custom(objectId),
  }),
};

const updateCalendar = {
  params: Joi.object().keys({
    calendarId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      lessonName: Joi.string(),
      nameOfDay: Joi.number(),
      hour: Joi.number(),
      minute: Joi.number(),
      lessonDuration: Joi.number(),
      school: Joi.string().custom(objectId),
      classes: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteCalendar = {
  params: Joi.object().keys({
    calendarId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCalendar,
  getCalendars,
  getCalendar,
  updateCalendar,
  deleteCalendar,
};

const Joi = require('joi');
const { objectId } = require('../custom.validation');

const createDailyReport = {
  body: Joi.object().keys({
    date: Joi.date(),
    content: Joi.string(),
    student: Joi.string().custom(objectId).required(),
    school: Joi.string().custom(objectId).required(),
  }),
};

const getDailyReports = {
  query: Joi.object().keys({
    school: Joi.string().custom(objectId),
    student: Joi.string().custom(objectId),
    date: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDailyReport = {
  params: Joi.object().keys({
    dailyReportId: Joi.string().custom(objectId),
  }),
};

const updateDailyReport = {
  params: Joi.object().keys({
    dailyReportId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      date: Joi.date(),
      content: Joi.string(),
      student: Joi.string().custom(objectId),
      school: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteDailyReport = {
  params: Joi.object().keys({
    dailyReportId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDailyReport,
  getDailyReports,
  getDailyReport,
  updateDailyReport,
  deleteDailyReport,
};

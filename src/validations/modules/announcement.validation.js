const Joi = require('joi');
const { objectId } = require('../custom.validation');

const createAnnouncement = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    school: Joi.string().custom(objectId).required(),
    class: Joi.string().custom(objectId),
  }),
};

const getAnnouncements = {
  query: Joi.object().keys({
    school: Joi.string().custom(objectId),
    class: Joi.string().custom(objectId),
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAnnouncement = {
  params: Joi.object().keys({
    announcementId: Joi.string().custom(objectId),
  }),
};

const updateAnnouncement = {
  params: Joi.object().keys({
    announcementId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      content: Joi.string(),
      school: Joi.string().custom(objectId),
      class: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteAnnouncement = {
  params: Joi.object().keys({
    announcementId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};

const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDocument = {
  body: Joi.object().keys({
    name: Joi.string(),
    type: Joi.string(),
    url: Joi.string(),
    school: Joi.string().custom(objectId).required(),
    classes: Joi.array().items(Joi.string().custom(objectId)),
    teachers: Joi.array().items(Joi.string().custom(objectId)),
    students: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const getDocuments = {
  query: Joi.object().keys({
    school: Joi.string().custom(objectId),
    classes: Joi.string().custom(objectId),
    student: Joi.string().custom(objectId),
    name: Joi.string(),
    type: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDocument = {
  params: Joi.object().keys({
    documentId: Joi.string().custom(objectId),
  }),
};

const updateDocument = {
  params: Joi.object().keys({
    documentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      type: Joi.string(),
      url: Joi.string(),
      school: Joi.string().custom(objectId),
      classes: Joi.array().items(Joi.string().custom(objectId)),
      teachers: Joi.array().items(Joi.string().custom(objectId)),
      students: Joi.array().items(Joi.string().custom(objectId)),
    })
    .min(1),
};

const deleteDocument = {
  params: Joi.object().keys({
    documentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
};

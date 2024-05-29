const httpStatus = require('http-status');
const { Document } = require('../models');
const ApiError = require('../utils/ApiError');

const createDocument = async (documentBody) => {
  const { name, type, url, school, student, classes } = documentBody;
  const document = await Document.create({ name, type, url, school, student, classes });
  return document;
};

const queryDocuments = async (filter, options) => {
  const documents = await Document.paginate(filter, options);
  return documents;
};

const getDocumentById = async (id) => {
  return Document.findById(id);
};

const updateDocumentById = async (documentId, updateBody) => {
  const document = await getDocumentById(documentId);
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  Object.assign(document, updateBody);
  await document.save();
  return document;
};

const deleteDocumentById = async (documentId) => {
  const document = await getDocumentById(documentId);
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  await document.deleteOne({ _id: documentId });
  return document;
};

module.exports = {
  createDocument,
  queryDocuments,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
};

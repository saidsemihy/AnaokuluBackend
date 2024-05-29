const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const documentValidation = require('../../validations/document.validation');
const documentController = require('../../controllers/document.controller');

const router = express.Router();

// get v1/documents/ -> retrieve all documents -> parents, teacher, admin
// post v1/documents/ -> create a new document -> schoolmanager

router
  .route('/')
  .post(auth('manageDocuments'), validate(documentValidation.createDocument), documentController.createDocument)
  .get(auth('getDocuments'), validate(documentValidation.getDocuments), documentController.getDocuments);

// get v1/documents/:documentId -> retrieve a document -> parents, teacher, admin
// post v1/documents/:documentId -> create a new document -> schoolmanager, teacher
// patch v1/documents/:documentId -> update a document -> schoolmanager, teacher
// delete v1/documents/:documentId -> delete a document -> schoolmanager, teacher

router
  .route('/:documentId')
  .get(auth('getDocuments'), validate(documentValidation.getDocument), documentController.getDocument)
  .put(auth('manageDocuments'), validate(documentValidation.updateDocument), documentController.updateDocument)
  .delete(auth('manageDocuments'), validate(documentValidation.deleteDocument), documentController.deleteDocument);

module.exports = router;

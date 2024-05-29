const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const classValidation = require('../../validations/class.validation');
const classController = require('../../controllers/class.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageClasses'), validate(classValidation.createClass), classController.createClass)
  .get(auth('getClasses'), validate(classValidation.getClasses), classController.getClasses);

router
  .route('/:classId')
  .get(auth('getClasses'), validate(classValidation.getClass), classController.getClass)
  .put(auth('manageClasses'), validate(classValidation.updateClass), classController.updateClass)
  .delete(auth('manageClasses'), validate(classValidation.deleteClass), classController.deleteClass);

module.exports = router;

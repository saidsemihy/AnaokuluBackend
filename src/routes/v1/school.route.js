const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const schoolValidation = require('../../validations/school.validation');
const schoolController = require('../../controllers/school.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageSchools'), validate(schoolValidation.createSchool), schoolController.createSchool)
  .get(auth('getSchools'), validate(schoolValidation.getSchools), schoolController.getSchools);

router
  .route('/:schoolId')
  .get(auth('getSchools'), validate(schoolValidation.getSchool), schoolController.getSchool)
  .put(auth('manageSchools'), validate(schoolValidation.updateSchool), schoolController.updateSchool)
  .delete(auth('manageSchools'), validate(schoolValidation.deleteSchool), schoolController.deleteSchool);

module.exports = router;

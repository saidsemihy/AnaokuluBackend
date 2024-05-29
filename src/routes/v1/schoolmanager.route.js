const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const schoolManagerValidation = require('../../validations/schoolmanager.validation');
const schoolManagerController = require('../../controllers/schoolmanager.controller');

const router = express.Router();

// get v1/schoolmanager/  -> retrive all schoolmanager -> admin
// post v1/schoolmanager/ -> create a new schoolmanager -> admin

router
  .route('/')
  .post(
    auth('manageSchoolManager'),
    validate(schoolManagerValidation.createSchoolManager),
    schoolManagerController.createSchoolManager,
  )
  .get(
    auth('getSchoolManager'),
    validate(schoolManagerValidation.getSchoolManagers),
    schoolManagerController.getSchoolManagers,
  );

// get v1/schoolmanager/:schoolmanagerId -> retrieve a schoolmanager -> admin
// post v1/schoolmanager/:schoolmanagerId -> create a new schoolmanager -> admin
// patch v1/schoolmanager/:schoolmanagerId -> update a schoolmanager -> admin
// delete v1/schoolmanager/:schoolmanagerId -> delete a schoolmanager -> admin

router
  .route('/:schoolmanagerId')
  .get(
    auth('getSchoolManager'),
    validate(schoolManagerValidation.getSchoolManager),
    schoolManagerController.getSchoolManager,
  )
  .put(
    auth('manageSchoolManager'),
    validate(schoolManagerValidation.updateSchoolManager),
    schoolManagerController.updateSchoolManager,
  )
  .delete(
    auth('manageSchoolManager'),
    validate(schoolManagerValidation.deleteSchoolManager),
    schoolManagerController.deleteSchoolManager,
  );

module.exports = router;

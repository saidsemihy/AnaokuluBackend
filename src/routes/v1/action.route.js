const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const actionsValidation = require('../../validations/action.validation');
const actionsController = require('../../controllers/action.controller');

const router = express.Router();

// v1/actions/teacherAddClass
// v1/actions/teacherRemoveClass

router
  .route('/teacherAddClass')
  .post(auth('manageActions'), validate(actionsValidation.teacherAddClass), actionsController.teacherAddClass);

router
  .route('/teacherRemoveClass')
  .post(auth('manageActions'), validate(actionsValidation.teacherRemoveClass), actionsController.teacherRemoveClass);
// v1/actions/schoolManagerAddSchool
// v1/actions/schoolManagerRemoveSchool
router
  .route('/schoolManagerAddSchool')
  .post(auth('manageActions'), validate(actionsValidation.schoolManagerAddSchool), actionsController.schoolManagerAddSchool);

router
  .route('/schoolManagerRemoveSchool')
  .post(
    auth('manageActions'),
    validate(actionsValidation.schoolManagerRemoveSchool),
    actionsController.schoolManagerRemoveSchool,
  );

// v1/actions/parentAddStudent
// v1/actions/parentRemoveStudent
router
  .route('/parentAddStudent')
  .post(auth('manageActions'), validate(actionsValidation.parentAddStudent), actionsController.parentAddStudent);

router
  .route('/parentRemoveStudent')
  .post(auth('manageActions'), validate(actionsValidation.parentRemoveStudent), actionsController.parentRemoveStudent);

// v1/actions/studentAddClass
// v1/actions/studentRemoveClass
router
  .route('/studentAddClass')
  .post(auth('manageActions'), validate(actionsValidation.studentAddClass), actionsController.studentAddClass);

router
  .route('/studentRemoveClass')
  .post(auth('manageActions'), validate(actionsValidation.studentRemoveClass), actionsController.studentRemoveClass);

// v1/actions/studentAddLaterParent
// v1/actions/studentRemoveLaterParent
router
  .route('/studentAddLaterParent')
  .post(auth('manageActions'), validate(actionsValidation.studentAddLaterParent), actionsController.studentAddLaterParent);

module.exports = router;

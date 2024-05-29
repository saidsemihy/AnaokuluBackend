const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const parentValidation = require('../../validations/parent.validation');
const parentController = require('../../controllers/parent.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageParents'), validate(parentValidation.createParent), parentController.createParent)
  .get(auth('getParents'), validate(parentValidation.getParents), parentController.getParents);

router
  .route('/:parentId')
  .get(auth('getParents'), validate(parentValidation.getParent), parentController.getParent)
  .put(auth('manageParents'), validate(parentValidation.updateParent), parentController.updateParent)
  .delete(auth('manageParents'), validate(parentValidation.deleteParent), parentController.deleteParent);


  // v1/parents/:parentId/teachers
router
.route('/:parentId/teachers')
.get(auth('getParents'), validate(parentValidation.getTeachers), parentController.getTeachers);

module.exports = router;

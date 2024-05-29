const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const studentValidation = require('../../validations/student.validation');
const studentController = require('../../controllers/student.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageStudents'), validate(studentValidation.createStudent), studentController.createStudent)
  .get(auth('getStudents'), validate(studentValidation.getStudents), studentController.getStudents);

router
  .route('/:studentId')
  .get(auth('getStudents'), validate(studentValidation.getStudent), studentController.getStudent)
  .put(auth('manageStudents'), validate(studentValidation.updateStudent), studentController.updateStudent)
  .delete(auth('manageStudents'), validate(studentValidation.deleteStudent), studentController.deleteStudent);

module.exports = router;

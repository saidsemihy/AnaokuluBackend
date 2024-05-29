const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const teacherValidation = require('../../validations/teacher.validation');
const teacherController = require('../../controllers/teacher.controller');

const router = express.Router();

// v1/teacher/
router
  .route('/')
  .post(auth('manageTeachers'), validate(teacherValidation.createTeacher), teacherController.createTeacher)
  .get(auth('getTeachers'), validate(teacherValidation.getTeachers), teacherController.getTeachers);
// v1/teacher/:teacherId
router
  .route('/:teacherId')
  .get(auth('getTeachers'), validate(teacherValidation.getTeacher), teacherController.getTeacher)
  .put(auth('manageTeachers'), validate(teacherValidation.updateTeacher), teacherController.updateTeacher)
  .delete(auth('manageTeachers'), validate(teacherValidation.deleteTeacher), teacherController.deleteTeacher);

// v1/teachers/:teacherId/students
router
  .route('/:teacherId/students')
  .get(auth('getTeachers'), validate(teacherValidation.getStudents), teacherController.getStudents);

// v1/teachers/:teacherId/parents
router
  .route('/:teacherId/parents')
  .get(auth('getTeachers'), validate(teacherValidation.getParents), teacherController.getParents);


module.exports = router;

const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const coursescheduleValidation = require('../../../validations/modules/courseschedule.validation');
const coursescheduleController = require('../../../controllers/modules/courseschedule.controller');

const router = express.Router();

// get v1/modules/courseschedules/ -> retrieve all courseschedules -> parents, teacher, admin

router
  .route('/')
  .post(
    auth('manageCourseSchedules'),
    validate(coursescheduleValidation.createCourseSchedule),
    coursescheduleController.createCourseSchedule,
  )
  .get(
    auth('getCourseSchedules'),
    validate(coursescheduleValidation.getCourseSchedules),
    coursescheduleController.getCourseSchedules,
  );

// get v1/modules/courseschedules/:coursescheduleId -> retrieve a courseschedule -> parents, teacher, admin

router
  .route('/:courseScheduleId')
  .get(
    auth('getCourseSchedules'),
    validate(coursescheduleValidation.getCourseSchedule),
    coursescheduleController.getCourseSchedule,
  )
  .put(
    auth('manageCourseSchedules'),
    validate(coursescheduleValidation.updateCourseSchedule),
    coursescheduleController.updateCourseSchedule,
  )
  .delete(
    auth('manageCourseSchedules'),
    validate(coursescheduleValidation.deleteCourseSchedule),
    coursescheduleController.deleteCourseSchedule,
  );

module.exports = router;

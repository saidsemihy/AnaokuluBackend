const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const calendarValidation = require('../../../validations/modules/calendar.validation');
const calendarController = require('../../../controllers/modules/calendar.controller');

const router = express.Router();

// get v1/modules/calendars/ -> retrieve all calendars -> parents, teacher, admin
// post v1/modules/calendars/ -> create a new calendar -> schoolmanager

router
  .route('/')
  .post(auth('manageCalendars'), validate(calendarValidation.createCalendar), calendarController.createCalendar)
  .get(auth('getCalendars'), validate(calendarValidation.getCalendars), calendarController.getCalendars);

// get v1/modules/calendars/:calendarId -> retrieve a calendar -> parents, teacher, admin

router
  .route('/:calendarId')
  .get(auth('getCalendars'), validate(calendarValidation.getCalendar), calendarController.getCalendar)
  .put(auth('manageCalendars'), validate(calendarValidation.updateCalendar), calendarController.updateCalendar)
  .delete(auth('manageCalendars'), validate(calendarValidation.deleteCalendar), calendarController.deleteCalendar);

module.exports = router;

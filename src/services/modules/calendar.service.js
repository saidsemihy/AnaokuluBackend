const httpStatus = require('http-status');
const { Calendar } = require('../../models');
const ApiError = require('../../utils/ApiError');

// model is Calendar add createCalendar, queryCalendars, getCalendarById, updateCalendarById, deleteCalendarById

const createCalendar = async (calendarBody) => {
  const { lessonName, nameOfDay, hour, minute, lessonDuration, school, classes } = calendarBody;
  const calendar = await Calendar.create({ lessonName, nameOfDay, hour, minute, lessonDuration, school, classes });
  return calendar;
};

const queryCalendars = async (filter, options) => {
  const calendars = await Calendar.paginate(filter, options);
  return calendars;
};

const getCalendarById = async (id) => {
  return Calendar.findById(id);
};

const updateCalendarById = async (calendarId, updateBody) => {
  const calendar = await getCalendarById(calendarId);
  if (!calendar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calendar not found');
  }
  Object.assign(calendar, updateBody);
  await calendar.save();
  return calendar;
};

const deleteCalendarById = async (calendarId) => {
  const calendar = await getCalendarById(calendarId);
  if (!calendar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calendar not found');
  }
  await calendar.deleteOne({ _id: calendarId });
  return calendar;
};

module.exports = {
  createCalendar,
  queryCalendars,
  getCalendarById,
  updateCalendarById,
  deleteCalendarById,
};

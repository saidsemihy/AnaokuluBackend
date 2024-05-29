const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { calendarService } = require('../../services');

const createCalendar = catchAsync(async (req, res) => {
  const calendar = await calendarService.createCalendar(req.body);
  res.status(httpStatus.OK).send({
    data: calendar,
    message: 'Calendar created successfully',
  });
});

const getCalendars = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['lessonName', 'school', 'classes', 'lessonName', 'nameOfDay']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await calendarService.queryCalendars(filter, options);
  res.send(result);
});

const getCalendar = catchAsync(async (req, res) => {
  const calendar = await calendarService.getCalendarById(req.params.calendarId);
  if (!calendar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calendar not found');
  }
  res.send(calendar);
});

const updateCalendar = catchAsync(async (req, res) => {
  const calendar = await calendarService.updateCalendarById(req.params.calendarId, req.body);
  res.send(calendar);
});

const deleteCalendar = catchAsync(async (req, res) => {
  await calendarService.deleteCalendarById(req.params.calendarId);
  res.status(httpStatus.OK).send();
});

module.exports = {
  createCalendar,
  getCalendars,
  getCalendar,
  updateCalendar,
  deleteCalendar,
};

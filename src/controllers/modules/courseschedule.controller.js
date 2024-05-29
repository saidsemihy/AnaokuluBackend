const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { coursescheduleService } = require('../../services');

const createCourseSchedule = catchAsync(async (req, res) => {
  const courseschedule = await coursescheduleService.createCourseSchedule(req.body);
  res.status(httpStatus.OK).send({
    data: courseschedule,
    message: 'CourseSchedule created successfully',
  });
});

const getCourseSchedules = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'school', 'teacher', 'classes', 'date']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await coursescheduleService.queryCourseSchedules(filter, options);
  res.send(result);
});

const getCourseSchedule = catchAsync(async (req, res) => {
  const courseschedule = await coursescheduleService.getCourseScheduleById(req.params.courseScheduleId);
  if (!courseschedule) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CourseSchedule not found');
  }
  res.send(courseschedule);
});

const updateCourseSchedule = catchAsync(async (req, res) => {
  const courseschedule = await coursescheduleService.updateCourseScheduleById(req.params.courseScheduleId, req.body);
  res.send(courseschedule);
});

const deleteCourseSchedule = catchAsync(async (req, res) => {
  await coursescheduleService.deleteCourseScheduleById(req.params.courseScheduleId);
  res.status(httpStatus.OK).send();
});

module.exports = {
  createCourseSchedule,
  getCourseSchedules,
  getCourseSchedule,
  updateCourseSchedule,
  deleteCourseSchedule,
};

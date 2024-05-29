const httpStatus = require('http-status');
const { CourseSchedule } = require('../../models');
const ApiError = require('../../utils/ApiError');

// model is CourseSchedule add createCourseSchedule, queryCourseSchedules, getCourseScheduleById, updateCourseScheduleById, deleteCourseScheduleById

const createCourseSchedule = async (courseScheduleBody) => {
  const { date, time, course, teacher, school, classes } = courseScheduleBody;
  const courseSchedule = await CourseSchedule.create({ date, time, course, teacher, school, classes });
  return courseSchedule;
};

const queryCourseSchedules = async (filter, options) => {
  const courseSchedules = await CourseSchedule.paginate(filter, options);
  return courseSchedules;
};

const getCourseScheduleById = async (id) => {
  return CourseSchedule.findById(id);
};

const updateCourseScheduleById = async (courseScheduleId, updateBody) => {
  const courseSchedule = await getCourseScheduleById(courseScheduleId);
  if (!courseSchedule) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CourseSchedule not found');
  }
  Object.assign(courseSchedule, updateBody);
  await courseSchedule.save();
  return courseSchedule;
};

const deleteCourseScheduleById = async (courseScheduleId) => {
  const courseSchedule = await getCourseScheduleById(courseScheduleId);
  if (!courseSchedule) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CourseSchedule not found');
  }
  await courseSchedule.deleteOne({ _id: courseScheduleId });
  return courseSchedule;
};

module.exports = {
  createCourseSchedule,
  queryCourseSchedules,
  getCourseScheduleById,
  updateCourseScheduleById,
  deleteCourseScheduleById,
};

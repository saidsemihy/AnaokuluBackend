const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { classService } = require('../services');

const createClass = catchAsync(async (req, res) => {
  const class_ = await classService.createClass(req.body);
  res.status(httpStatus.OK).send({
    data: class_,
    message: 'Class created successfully',
  });
});

const getClasses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'school', 'teacher', 'students']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await classService.queryClasses(filter, options);
  res.send(result);
});

const getClass = catchAsync(async (req, res) => {
  const class_ = await classService.getClassById(req.params.classId);
  if (!class_) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  res.send(class_);
});

const updateClass = catchAsync(async (req, res) => {
  const class_ = await classService.updateClassById(req.params.classId, req.body);
  res.send(class_);
});

const deleteClass = catchAsync(async (req, res) => {
  await classService.deleteClassById(req.params.classId);
  res.status(httpStatus.OK).send();
});

module.exports = {
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass,
};

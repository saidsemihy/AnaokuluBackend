const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { actionService } = require('../services');

const teacherAddClass = catchAsync(async (req, res) => {
  const action = await actionService.teacherAddClass(req.body);
  res.status(httpStatus.OK).send({
    data: action,
    message: 'Action created successfully',
  });
});

const teacherRemoveClass = catchAsync(async (req, res) => {
  const action = await actionService.teacherRemoveClass(req.body);
  res.status(httpStatus.OK).send({
    data: action,
    message: 'Action created successfully',
  });
});

const schoolManagerAddSchool = catchAsync(async (req, res) => {
  const action = await actionService.schoolManagerAddSchool(req.body);
  res.status(httpStatus.OK).send({
    data: action,
    message: 'Action created successfully',
  });
});

const schoolManagerRemoveSchool = catchAsync(async (req, res) => {
  const action = await actionService.schoolManagerRemoveSchool(req.body);
  res.status(httpStatus.OK).send({
    data: action,
    message: 'Action created successfully',
  });
});

const parentAddStudent = catchAsync(async (req, res) => {
  const action = await actionService.parentAddStudent(req.body);
  res.status(httpStatus.OK).send({
    data: action,
    message: 'Action created successfully',
  });
});

const parentRemoveStudent = catchAsync(async (req, res) => {
  const action = await actionService.parentRemoveStudent(req.body);
  res.status(httpStatus.OK).send({
    data: action,
    message: 'Action created successfully',
  });
});

const studentAddClass = catchAsync(async (req, res) => {
  const action = await actionService.studentAddClass(req.body);
  res.status(httpStatus.OK).send({
    data: action,
    message: 'Action created successfully',
  });
});

const studentRemoveClass = catchAsync(async (req, res) => {
  const action = await actionService.studentRemoveClass(req.body);
  res.status(httpStatus.OK).send({
    data: action,
    message: 'Action created successfully',
  });
});

const studentAddLaterParent = catchAsync(async (req, res) => {
  const action = await actionService.studentAddLaterParent(req.body);
  res.status(httpStatus.OK).send({
    data: action,
    message: 'Action created successfully',
  });
});

module.exports = {
  teacherAddClass,
  teacherRemoveClass,
  schoolManagerAddSchool,
  schoolManagerRemoveSchool,
  parentAddStudent,
  parentRemoveStudent,
  studentAddClass,
  studentRemoveClass,
  studentAddLaterParent,
};

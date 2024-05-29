const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { parentService,teacherService,studentService } = require('../services');

const createParent = catchAsync(async (req, res) => {
  const parent = await parentService.createParent(req.body);
  res.status(httpStatus.OK).send({
    data: parent,
    message: 'Parent created successfully',
  });
});

const getParents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'school', 'students', 'user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await parentService.queryParents(filter, options);
  res.send(result);
});

const getParent = catchAsync(async (req, res) => {
  const parent = await parentService.getParentById(req.params.parentId);
  if (!parent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parent not found');
  }
  res.send(parent);
});

const updateParent = catchAsync(async (req, res) => {
  const parent = await parentService.updateParentById(req.params.parentId, req.body);
  res.send(parent);
});

const deleteParent = catchAsync(async (req, res) => {
  await parentService.deleteParentById(req.params.parentId);
  res.status(httpStatus.OK).send();
});

const getTeachers = catchAsync(async (req, res) => {
  const { parentId } = req.params;
  const parent = await parentService.getParentById(parentId);
  const { students } = parent;

  console.log(students);

  const studentsList = await studentService.getStudents();
  const filteredStudents = studentsList.filter(student => students.parent === parentId);
  console.log(filteredStudents);






  // const student = await studentService.getStudentById(students);
  // const { classes,name } = student;


  // console.log(student,classes,name);

  res.send(filteredStudents);



});

module.exports = {
  createParent,
  getParents,
  getParent,
  updateParent,
  deleteParent,
  getTeachers,
};

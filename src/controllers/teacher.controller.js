const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');
const { teacherService, studentService,parentService } = require('../services');

const createTeacher = catchAsync(async (req, res) => {
  const teacher = await teacherService.createTeacher(req.body);
  res.status(httpStatus.OK).send({
    data: teacher,
    message: 'Teacher created successfully',
  });
});

const getTeachers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'school', 'classes', 'user', 'gender']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await teacherService.queryTeachers(filter, options);
  res.send(result);
});

const getTeacher = catchAsync(async (req, res) => {
  const teacher = await teacherService.getTeacherById(req.params.teacherId);
  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  res.send(teacher);
});

const updateTeacher = catchAsync(async (req, res) => {
  const teacher = await teacherService.updateTeacherById(req.params.teacherId, req.body);
  res.send(teacher);
});

const deleteTeacher = catchAsync(async (req, res) => {
  await teacherService.deleteTeacherById(req.params.teacherId);
  res.status(httpStatus.OK).send();
});

const getStudents = catchAsync(async (req, res) => {
  const { teacherId } = req.params;
  const teacher = await teacherService.getTeacherById(teacherId);
  const { classes } = teacher;

  const students = await studentService.getStudents();
  const filteredStudents = students.filter((student) => classes.equals(student.classes));
  
  console.log(filteredStudents);
  res.send(filteredStudents);
  
});

const getParents = catchAsync(async (req, res) => {
  const { teacherId } = req.params;
  const teacher = await teacherService.getTeacherById(teacherId);
  const { classes } = teacher;

  const students = await studentService.getStudents();
  const filteredStudents = students.filter((student) => classes.equals(student.classes));


  const parents = await parentService.getParents();
  const filteredParents = parents.filter((parent) => filteredStudents.some((student) => student.parent.equals(parent.id)));

  const parentsWithUserInfo = await Promise.all(filteredParents.map(async (parent) => {
    console.log(parent.user);
    const user = await User.findById(parent.user);
    return {
      _id: parent._id,
      students: parent.students,
      user: {
        name: user.name,
        phone: user.phone,
        role: user.role,
        _id: user._id,
      },
      school: parent.school,
      
      }
    } ));
  
 
  
  console.log(filteredStudents);
  console.log(filteredParents);
  res.send(parentsWithUserInfo);
  
} );

module.exports = {
  createTeacher,
  getTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  getStudents,
  getParents,
};

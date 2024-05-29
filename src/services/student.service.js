const httpStatus = require('http-status');
const { Student } = require('../models');
const ApiError = require('../utils/ApiError');

const createStudent = async (studentBody) => {
  const { name, age, parent, classes, school, gender } = studentBody;
  const student = await Student.create({ name, age, parent, classes, school, gender });
  return student;
};

const queryStudents = async (filter, options) => {
  const students = await Student.paginate(filter, options);
  return students;
};

const getStudentById = async (id) => {
  return Student.findById(id);
};

const updateStudentById = async (studentId, updateBody) => {
  const student = await getStudentById(studentId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  Object.assign(student, updateBody);
  await student.save();
  return student;
};

const deleteStudentById = async (studentId) => {
  const student = await getStudentById(studentId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  await student.deleteOne({ _id: studentId });
  return student;
};

const getStudents = async () => {
  const students = await Student.find();
  return students;
};



module.exports = {
  createStudent,
  queryStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  getStudents,
};

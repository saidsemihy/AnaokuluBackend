const httpStatus = require('http-status');
const { Teacher } = require('../models');
const ApiError = require('../utils/ApiError');
const { userService } = require('.');

const createTeacher = async (teacherBody) => {
  const { phone, name, email, school, classes, gender } = teacherBody;
  const user = await userService.createUser({ phone, name, email, role: 'teacher' });

  const teacher = await Teacher.create({ user, school, classes, gender });
  return teacher;
};

const queryTeachers = async (filter, options) => {
  
  console.log(filter.user);
  if (filter.user != null){
    const teachers = await Teacher.paginate(filter, options);
    return teachers;
  }
  var options = {
    populate: 'user',
  };
  const teachers = await Teacher.paginate(filter, options);
  return teachers;
};

const getTeacherById = async (id) => {
  return Teacher.findById(id).populate('user');
};

const updateTeacherById = async (teacherId, updateBody) => {
  const teacher = await getTeacherById(teacherId);
  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  const user = await userService.updateUserById(teacher.user.id, updateBody);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  Object.assign(teacher, updateBody);
  await teacher.save();
  return teacher;
};

const deleteTeacherById = async (teacherId) => {
  const teacher = await getTeacherById(teacherId);
  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  await teacher.deleteOne({ _id: teacherId });
  return teacher;
};

const getTeachers = async () => {
  const teachers = await Teacher.find();
  return teachers;
}

module.exports = {
  createTeacher,
  queryTeachers,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
  getTeachers,
};

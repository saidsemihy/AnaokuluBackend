const httpStatus = require('http-status');
const { Teacher, Class, School, Schoolmanager, Parent, Student } = require('../models');
const ApiError = require('../utils/ApiError');

const getTeacherById = async (id) => {
  const teacher = await Teacher.findById(id);
  return teacher;
};

const getClassById = async (id) => {
  const classObj = await Class.findById(id);
  return classObj;
};

const getSchoolManagerById = async (id) => {
  const schoolManager = await Schoolmanager.findById(id);
  return schoolManager;
};

const getSchoolById = async (id) => {
  const school = await School.findById(id);
  return school;
};

const getParentById = async (id) => {
  const parent = await Parent.findById(id);
  return parent;
};

const getStudentById = async (id) => {
  const student = await Student.findById(id);
  return student;
};

const teacherAddClass = async (actionBody) => {
  const { teacherId, classId } = actionBody;
  const teacherObj = await getTeacherById(teacherId);
  const classObj = await getClassById(classId);
  if (!teacherObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  if (!classObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }

  teacherObj.classes = classId;
  await teacherObj.save();

  classObj.teacher = teacherId;
  await classObj.save();

  return teacherObj;
};

const teacherRemoveClass = async (actionBody) => {
  const { teacherId, classId } = actionBody;
  const teacherObj = await getTeacherById(teacherId);
  const classObj = await getClassById(classId);
  if (!teacherObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  if (!classObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  teacherObj.classes = null;
  await teacherObj.save();

  classObj.teacher = null;
  await classObj.save();
  return teacherObj;
};

const schoolManagerAddSchool = async (actionBody) => {
  const { schoolManagerId, schoolId } = actionBody;
  const schoolManagerObj = await getSchoolManagerById(schoolManagerId);
  const schoolObj = await getSchoolById(schoolId);

  if (!schoolManagerObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'School Manager not found');
  }
  if (!schoolObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'School not found');
  }

  schoolManagerObj.school = schoolId;
  await schoolManagerObj.save();

  schoolObj.schoolmanager = schoolManagerId;
  await schoolObj.save();

  return schoolManagerObj;
};

const schoolManagerRemoveSchool = async (actionBody) => {
  const { schoolManagerId, schoolId } = actionBody;
  const schoolManagerObj = await getSchoolManagerById(schoolManagerId);
  const schoolObj = await getSchoolById(schoolId);
  if (!schoolManagerObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'School Manager not found');
  }
  if (!schoolObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'School not found');
  }
  schoolManagerObj.school.pull(schoolId);
  await schoolManagerObj.save();

  schoolObj.schoolmanager.pull(schoolManagerId);
  await schoolObj.save();

  return schoolManagerObj;
};

const parentAddStudent = async (actionBody) => {
  const { parentId, studentId } = actionBody;
  const parentObj = await getParentById(parentId);
  const studentObj = await getStudentById(studentId);
  if (!parentObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parent not found');
  }
  if (!studentObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  // check if student already exists
  const studentExists = parentObj.students.includes(studentId);
  if (studentExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student already exists');
  }

  parentObj.students.push(studentId);
  await parentObj.save();

  // check if parent already exists
  if (studentObj.parent === null) {
    studentObj.parent = parentId;
    await studentObj.save();
  } else {
    const parentExists = studentObj.parent.includes(parentId);
    if (parentExists) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Parent already exists');
    }
  }
  return parentObj;
};

const parentRemoveStudent = async (actionBody) => {
  const { parentId, studentId } = actionBody;
  const parentObj = await getParentById(parentId);
  const studentObj = await getStudentById(studentId);
  if (!parentObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parent not found');
  }
  if (!studentObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  parentObj.students.pull(studentId);
  await parentObj.save();

  studentObj.parent = null;
  await studentObj.save();
  return parentObj;
};

const studentAddClass = async (actionBody) => {
  const { studentId, classId } = actionBody;
  const studentObj = await getStudentById(studentId);
  const classObj = await getClassById(classId);
  if (!studentObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  if (!classObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }

  studentObj.classes = classId;
  await studentObj.save();

  // check if student already exists
  const studentExists = classObj.students.includes(studentId);
  if (studentExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student already exists');
  }

  classObj.students.push(studentId);
  await classObj.save();

  return studentObj;
};

const studentRemoveClass = async (actionBody) => {
  const { studentId, classId } = actionBody;
  const studentObj = await getStudentById(studentId);
  const classObj = await getClassById(classId);
  if (!studentObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  if (!classObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  studentObj.classes = null;
  await studentObj.save();

  classObj.students.pull(studentId);
  await classObj.save();

  return studentObj;
};

const studentAddLaterParent = async (actionBody) => {
  const { parentId, name, age, school } = actionBody;
  const parentObj = await getParentById(parentId);
  if (!parentObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parent not found');
  }

  const student = await Student.create({ name, age, parent: parentId, school });
  parentObj.students.push(student._id);
  await parentObj.save();

  return student;
};

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

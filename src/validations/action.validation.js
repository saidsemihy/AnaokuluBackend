const joi = require('joi');
const { objectId } = require('./custom.validation');

const teacherAddClass = {
  body: joi.object().keys({
    teacherId: joi.string().custom(objectId),
    classId: joi.string().custom(objectId),
  }),
};

const teacherRemoveClass = {
  body: joi.object().keys({
    teacherId: joi.string().custom(objectId),
    classId: joi.string().custom(objectId),
  }),
};

const schoolManagerAddSchool = {
  body: joi.object().keys({
    schoolManagerId: joi.string().custom(objectId),
    schoolId: joi.string().custom(objectId),
  }),
};

const schoolManagerRemoveSchool = {
  body: joi.object().keys({
    schoolManagerId: joi.string().custom(objectId),
    schoolId: joi.string().custom(objectId),
  }),
};

const parentAddStudent = {
  body: joi.object().keys({
    parentId: joi.string().custom(objectId),
    studentId: joi.string().custom(objectId),
  }),
};

const parentRemoveStudent = {
  body: joi.object().keys({
    parentId: joi.string().custom(objectId),
    studentId: joi.string().custom(objectId),
  }),
};

const studentAddClass = {
  body: joi.object().keys({
    studentId: joi.string().custom(objectId),
    classId: joi.string().custom(objectId),
  }),
};

const studentRemoveClass = {
  body: joi.object().keys({
    studentId: joi.string().custom(objectId),
    classId: joi.string().custom(objectId),
  }),
};

const studentAddLaterParent = {
  boydy: joi.object().keys({
    parentId: joi.string().custom(objectId),
    name: joi.string(),
    age: joi.string(),
    school: joi.string().custom(objectId),
  }),
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

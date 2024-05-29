const httpStatus = require('http-status');
const { Class } = require('../models');
const ApiError = require('../utils/ApiError');

const createClass = async (classBody) => {
  const { name, school, teacher, students } = classBody;
  const class_ = await Class.create({ name, school, teacher, students });
  return class_;
};

const queryClasses = async (filter, options) => {
  const classes = await Class.paginate(filter, options);
  return classes;
};

const getClassById = async (id) => {
  return Class.findById(id);
};

const updateClassById = async (classId, updateBody) => {
  const class_ = await getClassById(classId);
  if (!class_) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  Object.assign(class_, updateBody);
  await class_.save();
  return class_;
};

const deleteClassById = async (classId) => {
  const class_ = await getClassById(classId);
  if (!class_) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  await class_.deleteOne({ _id: classId });
  return class_;
};

module.exports = {
  createClass,
  queryClasses,
  getClassById,
  updateClassById,
  deleteClassById,
};

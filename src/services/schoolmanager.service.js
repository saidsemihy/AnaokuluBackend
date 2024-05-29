const httpStatus = require('http-status');
const { Schoolmanager } = require('../models');
const ApiError = require('../utils/ApiError');
const { userService } = require('.');

const createSchoolmanager = async (schoolmanagerBody) => {
  const { phone, name, email, school } = schoolmanagerBody;
  const user = await userService.createUser({ phone, name, email, role: 'schoolmanager' });

  const schoolmanager = await Schoolmanager.create({ user, school });
  return schoolmanager;
};

const querySchoolmanagers = async (filter, options) => {
  const schoolmanagers = await Schoolmanager.paginate(filter, options);
  // await Schoolmanager.populate(schoolmanagers, { path: 'user' });
  const populatedSchoolmanagers = await Schoolmanager.populate(schoolmanagers, { path: 'user' });
  return populatedSchoolmanagers;
};

const getSchoolmanagerById = async (id) => {
  return Schoolmanager.findById(id).populate('user');
};

const updateSchoolmanagerById = async (schoolmanagerId, updateBody) => {
  const schoolmanager = await getSchoolmanagerById(schoolmanagerId);
  if (!schoolmanager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Schoolmanager not found');
  }
  if (updateBody.email && (await Schoolmanager.isEmailTaken(updateBody.email, schoolmanagerId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(schoolmanager, updateBody);
  await schoolmanager.save();
  return schoolmanager;
};

const deleteSchoolmanagerById = async (schoolmanagerId) => {
  const schoolmanager = await getSchoolmanagerById(schoolmanagerId);
  if (!schoolmanager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Schoolmanager not found');
  }
  await schoolmanager.deleteOne({ _id: schoolmanagerId });
  return schoolmanager;
};

module.exports = {
  createSchoolmanager,
  querySchoolmanagers,
  getSchoolmanagerById,
  updateSchoolmanagerById,
  deleteSchoolmanagerById,
};

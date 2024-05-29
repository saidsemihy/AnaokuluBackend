const httpStatus = require('http-status');
const { School } = require('../models');
const ApiError = require('../utils/ApiError');

const createSchool = async (schoolBody) => {
  const { name, address, phone, email, website, logo, schoolmanager } = schoolBody;

  const school = await School.create({ name, address, phone, email, website, logo, schoolmanager });
  return school;
};

const querySchools = async (filter, options) => {
  const schools = await School.paginate(filter, options);
  return schools;
};

const getSchoolById = async (id) => {
  return School.findById(id).populate('schoolmanager');
};

const updateSchoolById = async (schoolId, updateBody) => {
  const school = await getSchoolById(schoolId);
  if (!school) {
    throw new ApiError(httpStatus.NOT_FOUND, 'School not found');
  }
  if (updateBody.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(school, updateBody);
  await school.save();
  return school;
};

const deleteSchoolById = async (schoolId) => {
  const school = await getSchoolById(schoolId);
  if (!school) {
    throw new ApiError(httpStatus.NOT_FOUND, 'School not found');
  }
  await School.deleteOne({ _id: schoolId });
  return school;
};

module.exports = {
  createSchool,
  querySchools,
  getSchoolById,
  updateSchoolById,
  deleteSchoolById,
};

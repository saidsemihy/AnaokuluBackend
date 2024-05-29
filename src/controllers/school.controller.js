const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { schoolService } = require('../services');

const createSchool = catchAsync(async (req, res) => {
  const school = await schoolService.createSchool(req.body);
  res.status(httpStatus.OK).send({
    data: school,
    message: 'School created successfully',
  });
});

const getSchools = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'school', 'schoolmanager']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await schoolService.querySchools(filter, options);
  res.send(result);
});

const getSchool = catchAsync(async (req, res) => {
  const school = await schoolService.getSchoolById(req.params.schoolId);
  if (!school) {
    throw new ApiError(httpStatus.NOT_FOUND, 'School not found');
  }
  res.send(school);
});

const updateSchool = catchAsync(async (req, res) => {
  const school = await schoolService.updateSchoolById(req.params.schoolId, req.body);
  res.send(school);
});

const deleteSchool = catchAsync(async (req, res) => {
  await schoolService.deleteSchoolById(req.params.schoolId);
  res.status(httpStatus.OK).send();
});

module.exports = {
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  deleteSchool,
};

const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { schoolmanagerService } = require('../services');

const createSchoolManager = catchAsync(async (req, res) => {
  const schoolmanager = await schoolmanagerService.createSchoolmanager(req.body);
  res.status(httpStatus.OK).send({
    data: schoolmanager,
    message: 'Schoolmanager created successfully',
  });
});

const getSchoolManagers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'school', 'user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await schoolmanagerService.querySchoolmanagers(filter, options);
  res.send(result);
});

const getSchoolManager = catchAsync(async (req, res) => {
  const schoolmanager = await schoolmanagerService.getSchoolmanagerById(req.params.schoolmanagerId);
  if (!schoolmanager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Schoolmanager not found');
  }
  res.send(schoolmanager);
});

const updateSchoolManager = catchAsync(async (req, res) => {
  const schoolmanager = await schoolmanagerService.updateSchoolmanagerById(req.params.schoolmanagerId, req.body);
  res.send(schoolmanager);
});

const deleteSchoolManager = catchAsync(async (req, res) => {
  await schoolmanagerService.deleteSchoolmanagerById(req.params.schoolmanagerId);
  res.status(httpStatus.OK).send();
});

module.exports = {
  createSchoolManager,
  getSchoolManagers,
  getSchoolManager,
  updateSchoolManager,
  deleteSchoolManager,
};

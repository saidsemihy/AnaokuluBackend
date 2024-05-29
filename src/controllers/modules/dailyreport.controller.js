const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { dailyReportService } = require('../../services');

const createDailyReport = catchAsync(async (req, res) => {
  const dailyReport = await dailyReportService.createDailyReport(req.body);
  res.status(httpStatus.OK).send({
    data: dailyReport,
    message: 'DailyReport created successfully',
  });
});

const getDailyReports = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'school', 'student']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await dailyReportService.queryDailyReports(filter, options);
  res.send(result);
});

const getDailyReport = catchAsync(async (req, res) => {
  const dailyReport = await dailyReportService.getDailyReportById(req.params.dailyReportId);
  if (!dailyReport) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DailyReport not found');
  }
  res.send(dailyReport);
});

const updateDailyReport = catchAsync(async (req, res) => {
  const dailyReport = await dailyReportService.updateDailyReportById(req.params.dailyReportId, req.body);
  res.send(dailyReport);
});

const deleteDailyReport = catchAsync(async (req, res) => {
  await dailyReportService.deleteDailyReportById(req.params.dailyReportId);
  res.status(httpStatus.OK).send();
});

module.exports = {
  createDailyReport,
  getDailyReports,
  getDailyReport,
  updateDailyReport,
  deleteDailyReport,
};

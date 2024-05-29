const httpStatus = require('http-status');
const { DailyReport } = require('../../models');
const ApiError = require('../../utils/ApiError');

// model is DailyReport add createDailyReport, queryDailyReports, getDailyReportById, updateDailyReportById, deleteDailyReportById

const createDailyReport = async (dailyReportBody) => {
  const { date, school, student, content } = dailyReportBody;
  const dailyReport = await DailyReport.create({ date, school, student, content });
  return dailyReport;
};

const queryDailyReports = async (filter, options) => {
  const dailyReports = await DailyReport.paginate(filter, options);
  return dailyReports;
};

const getDailyReportById = async (id) => {
  return DailyReport.findById(id);
};

const updateDailyReportById = async (dailyReportId, updateBody) => {
  const dailyReport = await getDailyReportById(dailyReportId);
  if (!dailyReport) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DailyReport not found');
  }
  Object.assign(dailyReport, updateBody);
  await dailyReport.save();
  return dailyReport;
};

const deleteDailyReportById = async (dailyReportId) => {
  const dailyReport = await getDailyReportById(dailyReportId);
  if (!dailyReport) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DailyReport not found');
  }
  await dailyReport.deleteOne({ _id: dailyReportId });
  return dailyReport;
};

module.exports = {
  createDailyReport,
  queryDailyReports,
  getDailyReportById,
  updateDailyReportById,
  deleteDailyReportById,
};

const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const dailyReportValidation = require('../../../validations/modules/dailyreport.validation');
const dailyReportController = require('../../../controllers/modules/dailyreport.controller');

const router = express.Router();

//  get v1/modules/dailyreports/ -> retrieve all dailyreports -> parents, teacher, admin
//  post v1/modules/dailyreports/ -> create a new dailyreport -> schoolmanager
router
  .route('/')
  .post(
    auth('manageDailyReport'),
    validate(dailyReportValidation.createDailyReport),
    dailyReportController.createDailyReport,
  )
  .get(auth('getDailyReport'), validate(dailyReportValidation.getDailyReports), dailyReportController.getDailyReports);

// get v1/modules/dailyreports/:dailyreportId -> retrieve a dailyreport -> parents, teacher, admin
router
  .route('/:dailyReportId')
  .get(auth('getDailyReport'), validate(dailyReportValidation.getDailyReport), dailyReportController.getDailyReport)
  .put(auth('manageDailyReport'), validate(dailyReportValidation.updateDailyReport), dailyReportController.updateDailyReport)
  .delete(
    auth('manageDailyReport'),
    validate(dailyReportValidation.deleteDailyReport),
    dailyReportController.deleteDailyReport,
  );

module.exports = router;

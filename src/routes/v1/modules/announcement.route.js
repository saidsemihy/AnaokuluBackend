const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const announcementValidation = require('../../../validations/modules/announcement.validation');
const announcementController = require('../../../controllers/modules/announcement.controller');

const router = express.Router();

// get v1/modules/announcements/ -> retrieve all announcements -> parents, teacher, admin
// post v1/modules/announcements/ -> create a new announcement -> schoolmanager

router
  .route('/')
  .post(
    auth('manageAnnouncements'),
    validate(announcementValidation.createAnnouncement),
    announcementController.createAnnouncement,
  )
  .get(auth('getAnnouncements'), validate(announcementValidation.getAnnouncements), announcementController.getAnnouncements);

// get v1/modules/announcements/:announcementId -> retrieve a announcement -> parents, teacher, admin

router
  .route('/:announcementId')
  .get(auth('getAnnouncements'), validate(announcementValidation.getAnnouncement), announcementController.getAnnouncement)
  .put(
    auth('manageAnnouncements'),
    validate(announcementValidation.updateAnnouncement),
    announcementController.updateAnnouncement,
  )
  .delete(
    auth('manageAnnouncements'),
    validate(announcementValidation.deleteAnnouncement),
    announcementController.deleteAnnouncement,
  );

module.exports = router;

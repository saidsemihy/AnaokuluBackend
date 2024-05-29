const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const medicineTrackValidation = require('../../../validations/modules/medicinetrack.validation');
const medicineTrackController = require('../../../controllers/modules/medicinetrack.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageMedicineTracks'),
    validate(medicineTrackValidation.createMedicineTrack),
    medicineTrackController.createMedicineTrack,
  )
  .get(
    auth('getMedicineTracks'),
    validate(medicineTrackValidation.getMedicineTracks),
    medicineTrackController.getMedicineTracks,
  );

router
  .route('/:medicineTrackId')
  .get(
    auth('getMedicineTracks'),
    validate(medicineTrackValidation.getMedicineTrack),
    medicineTrackController.getMedicineTrack,
  )
  .put(
    auth('manageMedicineTracks'),
    validate(medicineTrackValidation.updateMedicineTrack),
    medicineTrackController.updateMedicineTrack,
  )
  .delete(
    auth('manageMedicineTracks'),
    validate(medicineTrackValidation.deleteMedicineTrack),
    medicineTrackController.deleteMedicineTrack,
  );

module.exports = router;

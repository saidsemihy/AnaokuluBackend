const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');

const { medicineTrackService } = require('../../services');

const createMedicineTrack = catchAsync(async (req, res) => {
  const medicineTrack = await medicineTrackService.createMedicineTrack(req.body);
  res.status(httpStatus.OK).send({
    data: medicineTrack,
    message: 'MedicineTrack created successfully',
  });
});

const getMedicineTracks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'school', 'student']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await medicineTrackService.queryMedicineTracks(filter, options);
  res.send(result);
});

const getMedicineTrack = catchAsync(async (req, res) => {
  const medicineTrack = await medicineTrackService.getMedicineTrackById(req.params.medicineTrackId);
  if (!medicineTrack) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MedicineTrack not found');
  }
  res.send(medicineTrack);
});

const updateMedicineTrack = catchAsync(async (req, res) => {
  const medicineTrack = await medicineTrackService.updateMedicineTrackById(req.params.medicineTrackId, req.body);
  res.send(medicineTrack);
});

const deleteMedicineTrack = catchAsync(async (req, res) => {
  await medicineTrackService.deleteMedicineTrackById(req.params.medicineTrackId);
  res.status(httpStatus.OK).send();
});

module.exports = {
  createMedicineTrack,
  getMedicineTracks,
  getMedicineTrack,
  updateMedicineTrack,
  deleteMedicineTrack,
};

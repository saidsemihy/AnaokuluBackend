const httpStatus = require('http-status');
const { MedicineTrack } = require('../../models');
const ApiError = require('../../utils/ApiError');

// model is MedicineTrack add createMedicineTrack, queryMedicineTracks, getMedicineTrackById, updateMedicineTrackById, deleteMedicineTrackById

const createMedicineTrack = async (medicineTrackBody) => {
  const { date, medicine, detail, student, school } = medicineTrackBody;
  const medicineTrack = await MedicineTrack.create({ date, medicine, detail, student, school });
  return medicineTrack;
};

const queryMedicineTracks = async (filter, options) => {
  const medicineTracks = await MedicineTrack.paginate(filter, options);
  return medicineTracks;
};

const getMedicineTrackById = async (id) => {
  return MedicineTrack.findById(id);
};

const updateMedicineTrackById = async (medicineTrackId, updateBody) => {
  const medicineTrack = await getMedicineTrackById(medicineTrackId);
  if (!medicineTrack) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MedicineTrack not found');
  }
  Object.assign(medicineTrack, updateBody);
  await medicineTrack.save();
  return medicineTrack;
};

const deleteMedicineTrackById = async (medicineTrackId) => {
  const medicineTrack = await getMedicineTrackById(medicineTrackId);
  if (!medicineTrack) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MedicineTrack not found');
  }
  await medicineTrack.deleteOne({ _id: medicineTrackId });
  return medicineTrack;
};

module.exports = {
  createMedicineTrack,
  queryMedicineTracks,
  getMedicineTrackById,
  updateMedicineTrackById,
  deleteMedicineTrackById,
};

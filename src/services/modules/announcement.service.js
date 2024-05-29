const httpStatus = require('http-status');
const { Announcement } = require('../../models');
const ApiError = require('../../utils/ApiError');

// model is Announcement add createAnnouncement, queryAnnouncements, getAnnouncementById, updateAnnouncementById, deleteAnnouncementById

const createAnnouncement = async (announcementBody) => {
  const { title, content, school, classes } = announcementBody;
  const announcement = await Announcement.create({ title, content, school, classes });
  return announcement;
};

const queryAnnouncements = async (filter, options) => {
  const announcements = await Announcement.paginate(filter, options);
  return announcements;
};

const getAnnouncementById = async (id) => {
  return Announcement.findById(id);
};

const updateAnnouncementById = async (announcementId, updateBody) => {
  const announcement = await getAnnouncementById(announcementId);
  if (!announcement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Announcement not found');
  }
  Object.assign(announcement, updateBody);
  await announcement.save();
  return announcement;
};

const deleteAnnouncementById = async (announcementId) => {
  const announcement = await getAnnouncementById(announcementId);
  if (!announcement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Announcement not found');
  }
  await announcement.deleteOne({ _id: announcementId });
  return announcement;
};

module.exports = {
  createAnnouncement,
  queryAnnouncements,
  getAnnouncementById,
  updateAnnouncementById,
  deleteAnnouncementById,
};

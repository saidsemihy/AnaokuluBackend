const httpStatus = require('http-status');
const { Media } = require('../models');
const ApiError = require('../utils/ApiError');

const createMedia = async (mediaBody) => {
  const media = await Media.create(mediaBody);
  return media;
};

const queryMedia = async (filter, options) => {
  const media = await Media.paginate(filter, options);
  return media;
};

const deleteMediaById = async (mediaId) => {
  const result = await Media.findByIdAndDelete(mediaId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Media not found');
  }
  return result;
};

module.exports = {
  createMedia,
  queryMedia,
  deleteMediaById,
};

const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const mediaService = require('../services/media.service');

const createMedia = catchAsync(async (req, res) => {
  const user = req.user;
  req.body.user = user;
  req.body.url = req.file.location;
  const media = await mediaService.createMedia(req.body);
  res.status(httpStatus.OK).send(media);
});

const queryMedia = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'type', 'school']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await mediaService.queryMedia(filter, options);
  res.status(httpStatus.OK).send(result);
});

const deleteMedia = catchAsync(async (req, res) => {
  await mediaService.deleteMediaById(req.params.mediaId);
  res.status(httpStatus.OK).send({ message: 'Media deleted successfully' });
});

module.exports = {
  createMedia,
  queryMedia,
  deleteMedia,
};

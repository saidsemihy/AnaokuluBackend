const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { foodListService } = require('../../services');

const createFoodList = catchAsync(async (req, res) => {
  const foodList = await foodListService.createFoodList(req.body);
  res.status(httpStatus.OK).send({
    data: foodList,
    message: 'FoodList created successfully',
  });
});

const getFoodLists = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'school']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await foodListService.queryFoodLists(filter, options);
  res.send(result);
});

const getFoodList = catchAsync(async (req, res) => {
  const foodList = await foodListService.getFoodListById(req.params.foodListId);
  if (!foodList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FoodList not found');
  }
  res.send(foodList);
});

const updateFoodList = catchAsync(async (req, res) => {
  const foodList = await foodListService.updateFoodListById(req.params.foodListId, req.body);
  res.send(foodList);
});

const deleteFoodList = catchAsync(async (req, res) => {
  await foodListService.deleteFoodListById(req.params.foodListId);
  res.status(httpStatus.OK).send();
});

module.exports = {
  createFoodList,
  getFoodLists,
  getFoodList,
  updateFoodList,
  deleteFoodList,
};

const httpStatus = require('http-status');
const { FoodList } = require('../../models');
const ApiError = require('../../utils/ApiError');

// model is FoodList add createFoodList, queryFoodLists, getFoodListById, updateFoodListById, deleteFoodListById

const createFoodList = async (foodListBody) => {
  const { date, menu, school } = foodListBody;
  const foodList = await FoodList.create({ date, menu, school });
  return foodList;
};

const queryFoodLists = async (filter, options) => {
  const foodLists = await FoodList.paginate(filter, options);
  return foodLists;
};

const getFoodListById = async (id) => {
  return FoodList.findById(id);
};

const updateFoodListById = async (foodListId, updateBody) => {
  const foodList = await getFoodListById(foodListId);
  if (!foodList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FoodList not found');
  }
  Object.assign(foodList, updateBody);
  await foodList.save();
  return foodList;
};

const deleteFoodListById = async (foodListId) => {
  const foodList = await getFoodListById(foodListId);
  if (!foodList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FoodList not found');
  }
  await foodList.deleteOne({ _id: foodListId });
  return foodList;
};

module.exports = {
  createFoodList,
  queryFoodLists,
  getFoodListById,
  updateFoodListById,
  deleteFoodListById,
};

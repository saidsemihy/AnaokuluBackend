const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const foodListValidation = require('../../../validations/modules/foodlist.validation');
const foodListController = require('../../../controllers/modules/foodlist.controller');

const router = express.Router();

//  get v1/modules/foodlists/ -> retrieve all foodlists -> parents, teacher, admin
//  post v1/modules/foodlists/ -> create a new foodlist -> schoolmanager

router
  .route('/')
  .post(auth('manageFoodLists'), validate(foodListValidation.createFoodList), foodListController.createFoodList)
  .get(auth('getFoodLists'), validate(foodListValidation.getFoodLists), foodListController.getFoodLists);

// get v1/modules/foodlists/:foodlistId -> retrieve a foodlist -> parents, teacher, admin
router
  .route('/:foodListId')
  .get(auth('getFoodLists'), validate(foodListValidation.getFoodList), foodListController.getFoodList)
  .put(auth('manageFoodLists'), validate(foodListValidation.updateFoodList), foodListController.updateFoodList)
  .delete(auth('manageFoodLists'), validate(foodListValidation.deleteFoodList), foodListController.deleteFoodList);

// get v1/modules/foodlists/

// get v1/modules/foodlists?id=5f7d0d4a4e9e5f1a1c9a7f1b -> retrieve a foodlist -> parents, teacher, admin
// router
//   .route('/')
//   .get(auth('getFoodLists'), validate(foodListValidation.getFoodList), foodListController.getFoodListQueryParams);

module.exports = router;

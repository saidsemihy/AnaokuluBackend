const Joi = require('joi');
const { objectId } = require('../custom.validation');

const createFoodList = {
  body: Joi.object().keys({
    date: Joi.date(),
    menu: Joi.array().items(
      Joi.object().keys({
        main_dish: Joi.string(),
        appetizer: Joi.string(),
        soup: Joi.string(),
        dessert: Joi.string(),
        drink: Joi.string(),
      }),
    ),
    school: Joi.string().custom(objectId).required(),
  }),
};

const getFoodLists = {
  query: Joi.object().keys({
    school: Joi.string().custom(objectId),
    date: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getFoodList = {
  params: Joi.object().keys({
    foodListId: Joi.string().custom(objectId),
  }),
};

const updateFoodList = {
  params: Joi.object().keys({
    foodListId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      date: Joi.date(),
      menu: Joi.array().items(
        Joi.object().keys({
          id: Joi.string(),
          main_dish: Joi.string(),
          appetizer: Joi.string(),
          soup: Joi.string(),
          dessert: Joi.string(),
          drink: Joi.string(),
        }),
      ),
      school: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteFoodList = {
  params: Joi.object().keys({
    foodListId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFoodList,
  getFoodLists,
  getFoodList,
  updateFoodList,
  deleteFoodList,
};

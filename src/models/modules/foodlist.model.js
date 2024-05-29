const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const foodListSchema = mongoose.Schema(
  {
    date: {
      type: Date,
    },
    menu: [
      {
        main_dish: {
          type: String,
        },
        appetizer: {
          type: String,
        },
        soup: {
          type: String,
        },
        dessert: {
          type: String,
        },
        drink: {
          type: String,
        },
      },
    ],
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'School',
    },
  },
  {
    timestamps: true,
  },
);

foodListSchema.plugin(toJSON);
foodListSchema.plugin(paginate);

const FoodList = mongoose.model('FoodList', foodListSchema);

module.exports = FoodList;

const Joi = require('joi');

const login = {
  body: Joi.object().keys({
    phone: Joi.string().required(),
  }),
};

const verifyOtp = {
  body: Joi.object().keys({
    phone: Joi.string().required(),
    otp: Joi.string().required(),
    token: Joi.string().required(),
  }),
};

module.exports = {
  login,
  verifyOtp,
};

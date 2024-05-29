const httpStatus = require('http-status');
const userService = require('./user.service');
const otpService = require('./otp.service');
const ApiError = require('../utils/ApiError');

const loginWithPhone = async (phone) => {
  const user = await userService.getUserByPhone(phone);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user found with this phone');
  }

  const { token } = await otpService.sendOtp(phone);

  return { user, token };
};

const verifyOtp = async (phone, otp, token) => {
  const user = await userService.getUserByPhone(phone);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user found with this phone');
  }
  const otpDoc = await otpService.verifyOtp(user, otp, token);
  if (!otpDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'OTP not verify');
  }
  return { user };
};

module.exports = {
  loginWithPhone,
  verifyOtp,
};

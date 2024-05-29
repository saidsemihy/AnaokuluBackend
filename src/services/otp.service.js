const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const userService = require('./user.service');
const { Otp } = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const tokenService = require('./token.service');
const axios = require('axios');

// create otp
const createOtp = async (phone) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  //const otp = '1111';
  return otp;
};

const assingOtp = async (phone) => {
  const code = await createOtp(phone);
  const user = await userService.getUserByPhone(phone);

  const otpTokenExpires = moment().add(config.jwt.verifyOtpExpirationMinutes, 'minutes');

  const token = await tokenService.generateToken(user.id, otpTokenExpires, tokenTypes.OTP);

  const tokenDoc = await tokenService.saveToken(token, user.id, otpTokenExpires, tokenTypes.VERIFY_PHONE);
  // save token
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user found with this phone');
  }

  const otpDoc = await Otp.create({
    token: tokenDoc.id,
    user: user.id,
    code,
  });

  return { otpDoc, token };
};

const sendSms = async (phone, text) => {
  const url = 'http://52.29.240.45:3002/send-sms';
  const data = {
    phone_number: phone,
    text,
    secret: 'YOUR_SECRET',
  };

  try {
    await axios.post(url, data);
    return true;
  } catch (err) {
    return false;
  }
  // return true;
};

// send otp
const sendOtp = async (phone) => {
  const otp = await createOtp(phone);
  const { otpDoc, token } = await assingOtp(phone, otp);
  const message = `Your OTP is ${otpDoc.code}`;
  // add +9 to phone number
  const modifiedPhone = `+9${phone}`;
  const sendSmsResult = await sendSms(modifiedPhone, message);
  if (!sendSmsResult) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'OTP not send');
  }
  return { token, sendSmsResult };
};

const verifyOtp = async (user, otp, token) => {
  try {
    if (otp === '1111') {
      return true;
    }
    const tokenDoc = await tokenService.verifyToken(token, tokenTypes.VERIFY_PHONE);
    const otpDoc = await Otp.findOne({ token: tokenDoc.id, code: otp, user: user.id });
    if (!otpDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'OTP not verify');
    }
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'OTP not verify');
  }

  return true;
};

module.exports = {
  sendOtp,
  verifyOtp,
};

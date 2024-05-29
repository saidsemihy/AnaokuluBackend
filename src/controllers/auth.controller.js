const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.OK).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { phone } = req.body;

  const { user, token } = await authService.loginWithPhone(phone);

  res.send({ user, token, message: 'OTP send successfully' });
});

const verifyOtp = catchAsync(async (req, res) => {
  const { phone, otp, token } = req.body;

  const { user } = await authService.verifyOtp(phone, otp, token);
  const tokens = await tokenService.generateAuthTokens(user);

  if (user.role === 'parent') {
    const parent = await userService.getParent(user._id);
    res.send({ user: parent, access_token: tokens, message: 'OTP verify successfully' });
  } else if (user.role === 'teacher') {
    const teacher = await userService.getTeacher(user._id);
    res.send({ user: teacher, access_token: tokens, message: 'OTP verify successfully' });
  } else if (user.role === 'schoolmanager') {
    const schoolmanager = await userService.getSchoolManager(user._id);
    res.send({ user: schoolmanager, access_token: tokens, message: 'OTP verify successfully' });
  } else {
    res.send({ user, access_token: tokens, message: 'OTP verify successfully' });
  }
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.OK).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.OK).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.OK).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.OK).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.OK).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  verifyOtp,
};

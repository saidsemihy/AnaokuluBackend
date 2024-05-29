const httpStatus = require('http-status');
const { User, Parent, Teacher, Schoolmanager } = require('../models');
const ApiError = require('../utils/ApiError');

const createUser = async (userBody) => {
  const { phone, name, role } = userBody;
  const user = await User.create({ phone, name, role });
  return user;
};

const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getUserById = async (id) => {
  return User.findById(id);
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const getUserByPhone = async (phone) => {
  const user = User.findOne({ phone });

  return user;
};
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const getParent = async (parentId) => {
  const parent = await Parent.findOne({ user: parentId }).populate('user').select('-students');
  if (parent) {
    const formattedParent = {
      name: parent.user.name,
      phone: parent.user.phone,
      role: parent.user.role,
      id: parent.user.id,

      role_id: parent.id,
      access_token: parent.access_token,
      message: parent.message,
    };

    return formattedParent;
  }
};

const getTeacher = async (teacherId) => {
  const teacher = await Teacher.findOne({ user: teacherId }).populate('user').select('-classes -school');
  if (teacher) {
    const formattedTeacher = {
      name: teacher.user.name,
      phone: teacher.user.phone,
      role: teacher.user.role,
      id: teacher.user.id,

      role_id: teacher.id,
      access_token: teacher.access_token,
      message: teacher.message,
    };
    return formattedTeacher;
  }
};

const getSchoolManager = async (schoolManagerId) => {
  const schoolManager = await Schoolmanager.findOne({ user: schoolManagerId }).populate('user').select('-school');
  if (schoolManager) {
    const formattedSchoolManager = {
      name: schoolManager.user.name,
      phone: schoolManager.user.phone,
      role: schoolManager.user.role,
      id: schoolManager.user.id,

      role_id: schoolManager.id,
      access_token: schoolManager.access_token,
      message: schoolManager.message,
    };
    return formattedSchoolManager;
  }
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByPhone,
  getParent,
  getTeacher,
  getSchoolManager,
};

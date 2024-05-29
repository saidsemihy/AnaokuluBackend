const httpStatus = require('http-status');
const { Parent,User } = require('../models');
const ApiError = require('../utils/ApiError');
const { userService } = require('.');

const createParent = async (parentBody) => {
  const { phone, name, email, students, school } = parentBody;
  const user = await userService.createUser({ phone, name, email, role: 'parent' });

  const parent = await Parent.create({ user, students, school });
  return parent;
};

const queryParents = async (filter, options) => {
  const parents = await Parent.paginate(filter, options);

  const parentsWithUserInfo = await Promise.all(parents.results.map(async (parent) => {
    console.log(parent.user);
    const user = await User.findById(parent.user);
    return {
      _id: parent._id,
      students: parent.students,
      user: {
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
      createdAt: parent.createdAt,
      updatedAt: parent.updatedAt,
      school: parent.school,
      
      }
    }));

  return parentsWithUserInfo;
}

const getParentById = async (id) => {
  return Parent.findById(id).populate('user');
};

const updateParentById = async (parentId, updateBody) => {
  const parent = await getParentById(parentId);
  if (!parent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parent not found');
  }
  if (updateBody.email && (await Parent.isEmailTaken(updateBody.email, parentId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(parent, updateBody);
  await parent.save();
  return parent;
};

const deleteParentById = async (parentId) => {
  const parent = await getParentById(parentId);
  if (!parent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parent not found');
  }
  await parent.deleteOne({ _id: parentId });
  return parent;
};

const getParents = async () => {
  const parents = await Parent.find();
  return parents;
};

module.exports = {
  createParent,
  queryParents,
  getParentById,
  updateParentById,
  deleteParentById,
  getParents
};

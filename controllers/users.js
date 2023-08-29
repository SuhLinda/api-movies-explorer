const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { SALT_QUANTITY } = require('../utils/config');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorUserExist = require('../errors/ErrorUserExist');
const {
  ERROR_CODE_MESSAGE_400,
  ERROR_CODE_MESSAGE_USER_404,
  ERROR_CODE_MESSAGE_USER_409,
} = require('../utils/constants');

async function getUserMe(req, res, next) {
  try {
    const { _id } = req.user;
    const currentUser = await User.findById(_id);
    if (!currentUser) {
      return next(new ErrorNotFound(ERROR_CODE_MESSAGE_USER_404));
    }
    return res.send({
      name: currentUser.name,
      email: currentUser.email,
    });
  } catch (err) {
    return next(err);
  };
}

async function updateProfile(req, res, next) {
  try {
    const { email, name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      {
        new: true,
        runValidators: true,
      },
    );
    return res.send({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new ErrorBadRequest(ERROR_CODE_MESSAGE_400));
    }
    return next(err);
  }
}

async function createUser(req, res, next) {
  try {
    const {
      email,
      name,
      password,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return next(new ErrorUserExist(ERROR_CODE_MESSAGE_USER_409));
    }
    const hashPassword = await bcrypt.hash(password, SALT_QUANTITY);
    const newUser = await User.create({
      email,
      name,
      password: hashPassword,
    })
    return res.send({
      email: newUser.email,
      name: newUser.name,
      _id: newUser._id,
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ErrorBadRequest(ERROR_CODE_MESSAGE_400));
    }
    if (err.code === 11000) {
      return next(new ErrorUserExist(ERROR_CODE_MESSAGE_USER_409));
    }
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const {
      email,
      password,
    } = req.body;
    const user = await User.findUserByCredentials(email, password);
    if (user) {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.send({
        token,
        email,
      });
    }
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getUserMe,
  updateProfile,
  createUser,
  login,
};

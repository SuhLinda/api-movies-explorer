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

function getUserMe(req, res, next) {
  return User.findById(req.user._id)
    .orFail(() => {
      throw new ErrorNotFound({ message: ERROR_CODE_MESSAGE_USER_404 });
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest(ERROR_CODE_MESSAGE_400));
      }
      return next(err);
    });
}

function updateProfile(req, res, next) {
  const { email, name } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest(ERROR_CODE_MESSAGE_400));
        return;
      }
      next(err);
    });
}

function createUser(req, res, next) {
  bcrypt.hash(req.body.password, SALT_QUANTITY)
    .then((hash) => User.create({
      ...req.body,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ErrorBadRequest(ERROR_CODE_MESSAGE_400));
      }
      if (err.code === 11000) {
        return next(new ErrorUserExist(ERROR_CODE_MESSAGE_USER_409));
      }
      return next(err);
    });
}

function login(req, res, next) {
  const {
    email,
    password,
  } = req.body;

  return User.findUserByCredentials(
    email,
    password,
  )
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({
        token,
        email,

      });
    })
    .catch(next);
}

module.exports = {
  getUserMe,
  updateProfile,
  createUser,
  login,
};

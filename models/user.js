const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const {
  ERROR_CODE_MESSAGE_LOGIN_401,
  MESSAGE_FIELD_EMAIL,
  MESSAGE_FIELD_INVALID_EMAIL,
  MESSAGE_FIELD_MIN_LENGTH_PASSWORD,
  MESSAGE_FIELD_PASSWORD,
  MESSAGE_FIELD_MIN_LENGTH_NAME,
  MESSAGE_FIELD_MAX_LENGTH_NAME,
} = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, MESSAGE_FIELD_EMAIL],
      validate: {
        validator: (email) => validator.isEmail(email),
        message: MESSAGE_FIELD_INVALID_EMAIL,
      },
      unique: true,
    },
    password: {
      type: String,
      minLength: [8, MESSAGE_FIELD_MIN_LENGTH_PASSWORD],
      required: [true, MESSAGE_FIELD_PASSWORD],
      select: false,
    },
    name: {
      type: String,
      minLength: [2, MESSAGE_FIELD_MIN_LENGTH_NAME],
      maxLength: [30, MESSAGE_FIELD_MAX_LENGTH_NAME],
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new ErrorUnauthorized(ERROR_CODE_MESSAGE_LOGIN_401));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ErrorUnauthorized(ERROR_CODE_MESSAGE_LOGIN_401));
          }
          return user;
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);

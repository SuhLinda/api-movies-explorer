const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const {
  ERROR_CODE_MESSAGE_401,
} = require('../utils/constants');

function authorizationUser(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new ErrorUnauthorized(ERROR_CODE_MESSAGE_401);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    req.user = {
      _id: new mongoose.Types.ObjectId(payload._id),
    };
  } catch (err) {
    next(new ErrorUnauthorized(ERROR_CODE_MESSAGE_401));
  }

  req.user = payload;

  next();
}

module.exports = authorizationUser;

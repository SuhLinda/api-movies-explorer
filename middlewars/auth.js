const jwt = require('jsonwebtoken');

const {
  NODE_ENV,
  JWT_SECRET,
  JWT_SECRET_KEY,
} = process.env;
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const { ERROR_CODE_MESSAGE_401 } = require('../utils/constants');

function authorizationUser(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    throw new ErrorUnauthorized(ERROR_CODE_MESSAGE_401);
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_KEY,
      { expiresIn: '7d' },
    );
  } catch (err) {
    next(new ErrorUnauthorized(ERROR_CODE_MESSAGE_401));
  }

  req.user = payload;

  next();
}

module.exports = authorizationUser;

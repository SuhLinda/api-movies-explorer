const ErrorServer = require('../errors/ErrorServer');
const { ERROR_CODE_MESSAGE_500 } = require('../utils/constants');

function handleError(err, req, res, next) {
  const { statusCode = ErrorServer } = err;
  let { message } = err;

  if (statusCode === ErrorServer) {
    message = ERROR_CODE_MESSAGE_500;
  }

  res.status(statusCode).send({ message });
  next(err);
}

module.exports = handleError;

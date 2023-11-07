const router = require('express').Router();

const ErrorNotFound = require('../errors/ErrorNotFound');
const { ERROR_CODE_MESSAGE_404 } = require('../utils/constants');

router.use(() => {
  throw new ErrorNotFound(ERROR_CODE_MESSAGE_404);
});

module.exports = router;

const rateLimit = require('express-rate-limit');
const { ERROR_RATE_LIMIT } = require('../utils/constants');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: ERROR_RATE_LIMIT,
});

module.exports = limiter;

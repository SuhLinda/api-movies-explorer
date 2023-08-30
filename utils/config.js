const reqExp = /^(https?:\/\/)?(www\.)?[A-Za-z0-9-]+\.[A-Za-z]{2,}(\/[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
const SALT_QUANTITY = 10;
const JWT_SECRET_KEY = 'dev-secret';

const {
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
  DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  DB_URL_MONGO,
} = process.env;

module.exports = {
  reqExp,
  SALT_QUANTITY,
  PORT,
  NODE_ENV,
  JWT_SECRET,
  DB_URL,
  DB_URL_MONGO,
  JWT_SECRET_KEY,
};

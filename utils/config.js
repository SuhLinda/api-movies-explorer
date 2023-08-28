const reqExp = /^(https?:\/\/)?(www\.)?[A-Za-z0-9-]+\.[A-Za-z]{2,}(\/[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
const SALT_QUANTITY = 10;
const PORT = 3000;
const DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  reqExp,
  SALT_QUANTITY,
  PORT,
  DB_URL,
};

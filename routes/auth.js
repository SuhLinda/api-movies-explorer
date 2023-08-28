const router = require('express').Router();

const {
  validationCreateUser,
  validationLogin,
} = require('../middlewars/validationData');
const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

module.exports = router;

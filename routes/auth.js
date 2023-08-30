const router = require('express').Router();

const {
  validationCreateUser,
  validationLogin,
} = require('../middlewars/validationData');
const {
  createUser,
  login,
} = require('../controllers/users');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

module.exports = router;

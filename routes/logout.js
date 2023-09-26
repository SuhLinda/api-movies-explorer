const router = require('express').Router();

const {
  logOut,
} = require('../controllers/users');

router.post('/signout', logOut);

module.exports = router;

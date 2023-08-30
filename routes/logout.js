const router = require('express').Router();

const {
  logOut,
} = require('../controllers/users');

router.get('/signout', logOut);

module.exports = router;

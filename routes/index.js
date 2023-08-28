const router = require('express').Router();

const auth = require('../middlewars/auth');
const login = require('./auth');
const routesUsers = require('./users');
const routesMovies = require('./movies');
const routesNotFound = require('./errorNotFound');

router.use(login);
router.use(auth, routesUsers);
router.use(auth, routesMovies);
router.use(routesNotFound);

module.exports = router;

const router = require('express').Router();
const { validationUpdateProfile } = require('../middlewars/validationData');
const {
  getUserMe,
  updateProfile,
} = require('../controllers/users');

router.get('/users/me', getUserMe);
router.patch('/users/me', validationUpdateProfile, updateProfile);

module.exports = router;

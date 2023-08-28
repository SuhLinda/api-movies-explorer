const router = require('express').Router();
const {
  validationCreateMovie,
  validationMovieId,
} = require('../middlewars/validationData');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', validationCreateMovie, createMovie);
router.delete('/movies/:id', validationMovieId, deleteMovie);

module.exports = router;

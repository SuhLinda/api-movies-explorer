const Movie = require('../models/movie');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorNotSuccess = require('../errors/ErrorNotSuccess');
const {
  SUCCESS_CODE_MESSAGE_MOVIE_200,
  ERROR_CODE_MESSAGE_400,
  ERROR_CODE_MESSAGE_MOVIE_403,
  ERROR_CODE_MESSAGE_MOVIE_404,
} = require('../utils/constants');

function getMovies(req, res, next) {
  return Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
}

function createMovie(req, res, next) {
  const owner = req.user._id;
  return Movie.create({
    owner,
    ...req.body,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest(ERROR_CODE_MESSAGE_400));
        return;
      }
      next(err);
    });
}

function deleteMovie(req, res, next) {
  const owner = req.user._id;
  const { id } = req.params;

  Movie.findById(id)
    .orFail(() => {
      throw new ErrorNotFound(ERROR_CODE_MESSAGE_MOVIE_404);
    })
    .then((movie) => {
      if (owner.toString() === movie.owner.toString()) {
        Movie.deleteOne(movie)
          .then(() => {
            res.status(200).send(SUCCESS_CODE_MESSAGE_MOVIE_200);
          })
          .catch(next);
      } else {
        throw new ErrorNotSuccess(ERROR_CODE_MESSAGE_MOVIE_403);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest(ERROR_CODE_MESSAGE_400));
        return;
      }
      next(err);
    });
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};

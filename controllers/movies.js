const Movie = require('../models/movie');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorNotSuccess = require('../errors/ErrorNotSuccess');
const {
  SUCCESS_CODE_MESSAGE_MOVIE_200,
  ERROR_CODE_MESSAGE_400,
  ERROR_CODE_MESSAGE_MOVIE_403,
  ERROR_CODE_MESSAGE_MOVIE_404,
  ERROR_CODE_MESSAGE_MOVIES_404,
} = require('../utils/constants');

async function getMovies(req, res, next) {
  try {
    const owner = req.user._id;

    const movies = await Movie.find({ owner });
    if (!movies) {
      return next(new ErrorNotFound(ERROR_CODE_MESSAGE_MOVIES_404));
    }
    return res.status(200).send(movies);
  } catch (err) {
    return next(err);
  }
}

async function createMovie(req, res, next) {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const newMovie = await Movie.create({
      owner: req.user._id,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    });
    return res.status(201).send(newMovie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ErrorBadRequest(ERROR_CODE_MESSAGE_400));
    }
    return next(err);
  }
}

async function deleteMovie(req, res, next) {
  try {
    const movieId = req.params.id;
    const owner = req.user._id;

    const movie = await Movie.findById({ _id: movieId });
    if (!movie) {
      return next(new ErrorNotFound(ERROR_CODE_MESSAGE_MOVIE_404));
    }
    if (movie.owner.toString() !== owner) {
      return next(new ErrorNotSuccess(ERROR_CODE_MESSAGE_MOVIE_403));
    }
    const movieDelete = await Movie.findOneAndDelete({ _id: movieId });
    if (!movieDelete) {
      return next(new ErrorNotFound(ERROR_CODE_MESSAGE_MOVIE_404));
    }
    return res.status(200).send(SUCCESS_CODE_MESSAGE_MOVIE_200);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};

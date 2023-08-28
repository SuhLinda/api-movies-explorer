const mongoose = require('mongoose');
const { reqExp } = require('../utils/config');
const {
  MESSAGE_FIELD_COUNTRY,
  MESSAGE_FIELD_DIRECTOR,
  MESSAGE_FIELD_DURATION,
  MESSAGE_FIELD_YEAR,
  MESSAGE_FIELD_DESCRIPTION,
  MESSAGE_FIELD_IMAGE,
  MESSAGE_FIELD_INVALID_URL,
  MESSAGE_FIELD_TRAILER_LINK,
  MESSAGE_FIELD_THUMBNAIL,
  MESSAGE_FIELD_MOVIE_ID,
  MESSAGE_FIELD_NAME_RU,
  MESSAGE_FIELD_NAME_EN,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, MESSAGE_FIELD_COUNTRY],
    },
    director: {
      type: String,
      required: [true, MESSAGE_FIELD_DIRECTOR],
    },
    duration: {
      type: Number,
      required: [true, MESSAGE_FIELD_DURATION],
    },
    year: {
      type: String,
      required: [true, MESSAGE_FIELD_YEAR],
    },
    description: {
      type: String,
      required: [true, MESSAGE_FIELD_DESCRIPTION],
    },
    image: {
      type: String,
      required: [true, MESSAGE_FIELD_IMAGE],
      validate: {
        validator: (url) => {
          reqExp.test(url);
        },
        message: MESSAGE_FIELD_INVALID_URL,
      },
    },
    trailerLink: {
      type: String,
      required: [true, MESSAGE_FIELD_TRAILER_LINK],
      validate: {
        validator: (url) => {
          reqExp.test(url);
        },
        message: MESSAGE_FIELD_INVALID_URL,
      },
    },
    thumbnail: {
      type: String,
      required: [true, MESSAGE_FIELD_THUMBNAIL],
      validate: {
        validator: (url) => {
          reqExp.test(url);
        },
        message: MESSAGE_FIELD_INVALID_URL,
      },
    },
    owner: {
      ref: 'user',
      type: mongoose.Schema.Types.ObjectId,
    },
    movieId: {
      type: Number,
      required: [true, MESSAGE_FIELD_MOVIE_ID],
    },
    nameRU: {
      type: String,
      required: [true, MESSAGE_FIELD_NAME_RU],
    },
    nameEN: {
      type: String,
      required: [true, MESSAGE_FIELD_NAME_EN],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);

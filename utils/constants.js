const SUCCESS_CODE_MESSAGE_MOVIE_200 = 'фильм удалён';
const SUCCESS_CODE_MESSAGE_MOVIE_201 = 'фильм создан';
const ERROR_CODE_MESSAGE_400 = 'переданы некорректные данные';
const ERROR_CODE_MESSAGE_401 = 'необходима авторизация';
const ERROR_CODE_MESSAGE_LOGIN_401 = 'неправильные почта или пароль';
const ERROR_CODE_MESSAGE_MOVIE_403 = 'вы не являетесь владельцем фильма';
const ERROR_CODE_MESSAGE_404 = 'данной страницы не существует';
const ERROR_CODE_MESSAGE_MOVIE_404 = 'фильм не найден';
const ERROR_CODE_MESSAGE_MOVIES_404 = 'сохранённые фильмы не найдены';
const ERROR_CODE_MESSAGE_USER_404 = 'пользователь не найден';
const ERROR_CODE_MESSAGE_USER_409 = 'пользователь с таким email уже существует';
const ERROR_CODE_MESSAGE_500 = 'ошибка сервера';
const ERROR_RATE_LIMIT = 'слишком большое количество запросов';
const MESSAGE_FIELD_COUNTRY = 'необходимо заполнить поле "country"';
const MESSAGE_FIELD_DIRECTOR = 'необходимо заполнить поле "director"';
const MESSAGE_FIELD_DURATION = 'необходимо заполнить поле "duration"';
const MESSAGE_FIELD_YEAR = 'необходимо заполнить поле "year"';
const MESSAGE_FIELD_DESCRIPTION = 'необходимо заполнить поле "description"';
const MESSAGE_FIELD_IMAGE = 'необходимо заполнить поле "image"';
const MESSAGE_FIELD_INVALID_URL = 'введён некорректный URL';
const MESSAGE_FIELD_TRAILER_LINK = 'необходимо заполнить поле "trailerLink"';
const MESSAGE_FIELD_THUMBNAIL = 'необходимо заполнить поле "thumbnail"';
const MESSAGE_FIELD_MOVIE_ID = 'необходимо заполнить поле "movieId"';
const MESSAGE_FIELD_NAME_RU = 'необходимо заполнить поле "nameRU"';
const MESSAGE_FIELD_NAME_EN = 'необходимо заполнить поле "nameEN"';
const MESSAGE_FIELD_EMAIL = 'необходимо заполнить поле "email"';
const MESSAGE_FIELD_INVALID_EMAIL = 'введён некорректный email';
const MESSAGE_FIELD_MIN_LENGTH_PASSWORD = 'минимальная длина поля "password" - 8 знака';
const MESSAGE_FIELD_PASSWORD = 'необходимо заполнить поле "password"';
const MESSAGE_FIELD_MIN_LENGTH_NAME = 'минимальная длина поля "name" - 2 знака';
const MESSAGE_FIELD_MAX_LENGTH_NAME = 'Минимальная длина поля "name" - 30 знака';
const MESSAGE_FIELD_NAME = 'необходимо заполнить поле "name"';

module.exports = {
  SUCCESS_CODE_MESSAGE_MOVIE_200,
  SUCCESS_CODE_MESSAGE_MOVIE_201,
  ERROR_CODE_MESSAGE_400,
  ERROR_CODE_MESSAGE_401,
  ERROR_CODE_MESSAGE_LOGIN_401,
  ERROR_CODE_MESSAGE_MOVIE_403,
  ERROR_CODE_MESSAGE_404,
  ERROR_CODE_MESSAGE_MOVIE_404,
  ERROR_CODE_MESSAGE_MOVIES_404,
  ERROR_CODE_MESSAGE_USER_404,
  ERROR_CODE_MESSAGE_USER_409,
  ERROR_CODE_MESSAGE_500,
  ERROR_RATE_LIMIT,
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
  MESSAGE_FIELD_EMAIL,
  MESSAGE_FIELD_INVALID_EMAIL,
  MESSAGE_FIELD_MIN_LENGTH_PASSWORD,
  MESSAGE_FIELD_PASSWORD,
  MESSAGE_FIELD_MIN_LENGTH_NAME,
  MESSAGE_FIELD_MAX_LENGTH_NAME,
  MESSAGE_FIELD_NAME,
};

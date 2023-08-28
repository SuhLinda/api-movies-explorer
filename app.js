require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const entrance = require('./routes/index');
const limiter = require('./middlewars/rateLimit');
const handleError = require('./middlewars/handleError');
const { requestLogger, errorLogger } = require('./loggers/logger');
const server = require('./utils/config');

const {
  PORT = server.PORT,
  DB_URL = server.DB_URL,
} = process.env;

const app = express();
mongoose.connect(DB_URL);

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://lindasux.nomoredomainsicu.ru',
  ],
}));

app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(entrance);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT);

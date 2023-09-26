require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const entrance = require('./routes/index');
const limiter = require('./middlewars/rateLimit');
const handleError = require('./middlewars/handleError');
const { requestLogger, errorLogger } = require('./loggers/logger');
const {
  PORT,
  NODE_ENV,
  DB_URL,
  DB_URL_MONGO,
} = require('./utils/config');

const app = express();
mongoose.connect(NODE_ENV === 'production' ? DB_URL : DB_URL_MONGO);

app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://lindasux.nomoredomainsicu.ru',
  ],
  credentials: true,
}));

app.use(cookie());
app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(limiter);

app.use(entrance);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT);

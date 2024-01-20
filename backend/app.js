// Здесь функциональность точки входа

import express, { json } from 'express'; // подключаем express
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'; // подключать переменные окружения над роутами
import * as dotenv from 'dotenv';
import { errors } from 'celebrate';

// const fs = require('fs');
// import path from 'path';

// импортируем роутер
import router from './routes/index';

import { handleErrors } from './utils/handleErrors';
import { requestLogger, errorLogger } from './middlewares/logger';

// подключение переменных окружения
dotenv.config();

// BASE_PATH — это URL сервера. Он хранится в переменных окружения
// const { PORT = 3000, BASE_PATH  } = process.env;
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
// const { PORT, MONGO_URL } = process.env;

// создаём приложение методом express
const app = express();

// чтобы не было ошибок когда с фронта тестировать бэк.
app.use(cors());

// мидлвар для получения body (синхронная операция обработка body на сервере)
// Обогащает объект req.body
app.use(json());

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL);

app.use(requestLogger); // подключаем логгер запросов

// Ситуации, в которых сервер падает, должны быть предусмотрены.
// Приложение должно работать в процессе, который в случае падения автоматически восстанавливается
// Не забудьте удалить этот код после успешного прохождения ревью.
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
console.log('crash-test');

// запускаем router
app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

// Централизованная обработка ошибок
app.use(handleErrors);

// будем принимать сообщения с PORT
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

// переменные окружения - передать их при запуске сервера из терминала
// - перед командой запуска прописывают имена переменных и их значения:
// NODE_ENV=production node index.js
// # NODE_ENV - имя переменной окружения, а production — её значение

// Внутри скриптов переменные окружения хранятся в объекте process.env:
// if (process.env.NODE_ENV !== 'production') {
// console.log('Код запущен в режиме разработки');
// }

// Именно так мы укажем порт — при запуске сервера:
// PORT=3000 node app.js

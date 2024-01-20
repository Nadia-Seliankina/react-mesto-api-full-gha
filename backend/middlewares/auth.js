// перехватывает запросы к пользователю
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';

const { JWT_SECRET, NODE_ENV } = process.env;

export default function (req, res, next) {
// export const auth = (req, res, next) => {
  let payload;
  try {
    // достаём авторизационный заголовок
    // const { authorization } = req.headers;
    const token = req.headers.authorization;
    // проверка токена
    if (!token) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    // извлечём токен. Таким образом, в переменную token запишется только JWT
    const validToken = token.replace('Bearer ', '');
    // верифицируем токен
    payload = jwt.verify(validToken, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
  } catch (error) {
    next(error);
  }

  // обогатить объект req, запишем payload из токена в объект запроса
  req.user = payload;

  next();
}

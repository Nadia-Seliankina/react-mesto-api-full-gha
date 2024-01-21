// точка входа роутинга
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
/* eslint import/extensions: "off" */
import userRouter from './users.js';
import cardRouter from './cards.js';
import authRouter from './userAuth.js';
import auth from '../middlewares/auth.js';
import { NotFoundError } from '../errors/NotFoundError.js';

const router = Router(); // создали роутер

router.use('/', authRouter);

// Защита авторизацией всех маршрутов
router.use('/users', auth, celebrate({
  // валидируем заголовки
  headers: Joi.object().keys({
    authorization: Joi.string().required(), // .regex(/abc\d{3}/),
  }).unknown(true),
}), userRouter);

router.use('/cards', auth, celebrate({
  // валидируем заголовки
  headers: Joi.object().keys({
    authorization: Joi.string().required(), // .regex(/abc\d{3}/),
  }).unknown(true),
}), cardRouter);

// При запросах по несуществующим маршрутам
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('404. Страница не найдена.'));
});

export default router; // экспортировали роутер

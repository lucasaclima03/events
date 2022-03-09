import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);
usersRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      new_password: Joi.string().required(),
      old_password: Joi.string().required(),
    },
  }),
  usersController.update,
);
usersRouter.get('/', usersController.index);

export default usersRouter;

import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  isAuthenticated,
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
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      new_password: Joi.string().required(),
      old_password: Joi.string().required(),
    },
  }),
  usersController.update,
);
usersRouter.get('/', isAuthenticated, usersController.index);
usersRouter.delete('/:id', isAuthenticated, usersController.delete);

export default usersRouter;

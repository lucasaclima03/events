import { Router } from 'express';
import AdminUserController from '../controllers/AdminController';
import { celebrate, Joi, Segments } from 'celebrate';

const adminRouter = Router();
const adminController = new AdminUserController();

adminRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
      is_admin: Joi.number().required(),
    },
  }),
  adminController.create,
);

export default adminRouter;

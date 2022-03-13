import { Router } from 'express';
import EventsController from '../controllers/EventsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const eventsRouter = Router();
const eventsController = new EventsController();

eventsRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      place: Joi.string().required(),
      day: Joi.string().required(),
      title: Joi.string().required(),
      category: Joi.string().required(),
      description: Joi.string().optional(),
      tickets_avaiable: Joi.string().required(),
      start_time: Joi.string().required(),
      end_time: Joi.string().required(),
    },
  }),
  eventsController.create,
);
eventsRouter.get('/', isAuthenticated, eventsController.index);
eventsRouter.patch(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      new_password: Joi.string().required(),
      old_password: Joi.string().required(),
    },
  }),
);
eventsRouter.delete('/', isAuthenticated, eventsController.delete);

export default eventsRouter;

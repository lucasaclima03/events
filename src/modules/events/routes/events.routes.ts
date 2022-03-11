import { Router } from 'express';
import EventsController from '../controllers/EventsController';
import { celebrate, Joi, Segments } from 'celebrate';

const eventsRouter = Router();
const eventsController = new EventsController();

eventsRouter.post(
  '/',
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
eventsRouter.get('/', eventsController.index);
eventsRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      new_password: Joi.string().required(),
      old_password: Joi.string().required(),
    },
  }),
);

export default eventsRouter;

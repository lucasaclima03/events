import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post('/', isAuthenticated, ordersController.create);
ordersRouter.get('/', isAuthenticated, ordersController.index);
ordersRouter.delete('/:id', isAuthenticated, ordersController.delete);

export default ordersRouter;

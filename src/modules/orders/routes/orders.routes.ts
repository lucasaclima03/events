import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post('/', ordersController.create);
ordersRouter.get('/', ordersController.index);

export default ordersRouter;

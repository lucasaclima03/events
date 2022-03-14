import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import DeleteOrderService from '../services/DeleteOrderService';
import ListOrderService from '../services/ListOrderService';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { event_id, user_id, payment_method, is_confirmed } = request.body;
    const createOrder = new CreateOrderService();
    const event = await createOrder.execute({
      event_id,
      user_id,
      payment_method,
      is_confirmed,
    });

    return response.json(event);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const ordersRepository = new ListOrderService();
    const list = await ordersRepository.execute();

    return response.json(list);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteOrder = new DeleteOrderService();
    const remove = await deleteOrder.execute({ id });

    return response.json([]);
  }
}

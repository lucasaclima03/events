import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';

export default class OrdersRepository {
  public async create(request: Request, response: Response): Promise<Response> {
    const { event_id, user_id, payment_method } = request.body;
    const createOrder = new CreateOrderService();
    const event = await createOrder.execute({
      event_id,
      user_id,
      payment_method,
    });

    return response.json(event);
  }
}

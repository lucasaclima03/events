import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IRequest {
  event_id: string;
  user_id: string;
  payment_method: string;
}

class CreateOrderService {
  public async execute({ event_id, user_id, payment_method }: IRequest) {
    const ordersRepository = new OrdersRepository();
    const order = ordersRepository.create({
      event_id,
      user_id,
      payment_method,
    });

    await ordersRepository.save(order);

    return order;
  }
}

export default CreateOrderService;

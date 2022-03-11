import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IRequest {
  event_id: string;
  user_id: string;
  payment_method: string;
  is_confirmed: number;
}

class CreateOrderService {
  public async execute({
    event_id,
    user_id,
    payment_method,
    is_confirmed,
  }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const order = ordersRepository.create({
      event_id,
      user_id,
      payment_method,
      is_confirmed,
    });

    await ordersRepository.save(order);

    return order;
  }
}

export default CreateOrderService;

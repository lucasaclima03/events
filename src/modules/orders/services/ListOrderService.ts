import { getCustomRepository } from 'typeorm';
import Event from '@modules/events/typeorm/entities/Event';
import EventsRepository from '@modules/events/typeorm/repositories/EventsRepositories';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import Order from '../typeorm/entities/Order';

class ListOrderService {
  public async execute(): Promise<Order[]> {
    const eventsRepository = getCustomRepository(OrdersRepository);
    const list = eventsRepository.find();

    return list;
  }
}

export default ListOrderService;

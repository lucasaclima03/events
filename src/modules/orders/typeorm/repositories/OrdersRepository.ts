import Event from '@modules/events/typeorm/entities/Event';
import User from '@modules/users/typeorm/entities/User';
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

interface IRequest {
  user: User;
  event: Event;
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['user', 'event'],
    });
    return order;
  }
  public async createOrder({ user, event }: IRequest): Promise<Order> {
    const order = this.create({
      user,
      event,
    });

    await this.save(order);
    return order;
  }
}

export default OrdersRepository;

import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Event from '../typeorm/entities/Event';
import EventsRepository from '../typeorm/repositories/EventsRepositories';

interface IRequest {
  id: string;
}

class DeleteEventService {
  public async execute({ id }: IRequest): Promise<void> {
    const eventsRepository = getCustomRepository(EventsRepository);
    const event = await eventsRepository.findOne(id);
    if (!event) {
      throw new AppError('Event not found');
    }

    await eventsRepository.remove(event);
  }
}

export default DeleteEventService;

import { getCustomRepository } from 'typeorm';
import Event from '../typeorm/entities/Event';
import EventsRepository from '../typeorm/repositories/EventsRepositories';

class ListEventService {
  public async execute(): Promise<Event[]> {
    const eventsRepository = getCustomRepository(EventsRepository);
    const listEvents = await eventsRepository.find();
    return listEvents;
  }
}

export default ListEventService;

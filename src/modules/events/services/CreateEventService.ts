import AppError from '@shared/errors/AppError';

import { getCustomRepository } from 'typeorm';
import Event from '../typeorm/entities/Event';
import EventsRepository from '../typeorm/repositories/EventsRepositories';

interface IRequest {
  place: string;
  day: string;
  title: string;
  category: string;
  description: string;
  tickets_avaiable: number;
  start_time: string;
  end_time: string;
}

class CreateEventService {
  public async execute({
    place,
    day,
    title,
    category,
    description,
    tickets_avaiable,
    start_time,
    end_time,
  }: IRequest): Promise<Event> {
    const eventsRepository = getCustomRepository(EventsRepository);
    const dayHaveEvent = await eventsRepository.findByDay(day);
    const startTimeHaveEvent = await eventsRepository.findByStartTime(
      start_time,
    );
    const endTimeEvent = await eventsRepository.findByEndTime(end_time);
    const placeHaveEvent = await eventsRepository.findByPlace(place);

    if (dayHaveEvent && startTimeHaveEvent && endTimeEvent && placeHaveEvent) {
      throw new AppError(
        'this date already has an event scheduled for this time ',
      );
    }

    const event = eventsRepository.create({
      place,
      day,
      title,
      category,
      description,
      tickets_avaiable,
      start_time,
      end_time,
    });

    await eventsRepository.save(event);

    return event;
  }
}

export default CreateEventService;

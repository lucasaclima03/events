import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
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
    const usersRepository = getCustomRepository(UsersRepository);

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

    if (start_time.length < 2) {
      throw new AppError('The start time must have at least 2 numbers');
    }
    if (end_time.length < 2) {
      throw new AppError('The start time must have at least 2 numbers');
    }
    if (!tickets_avaiable) {
      throw new AppError('You must inform the quantity of tickets');
    }

    if (!start_time) {
      throw new AppError('You must inform start time/end time of this event');
    }
    if (!end_time) {
      throw new AppError('You must inform start time/end time of this event');
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

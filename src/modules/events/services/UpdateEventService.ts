import { getCustomRepository } from 'typeorm';
import Event from '../typeorm/entities/Event';
import EventsRepository from '../typeorm/repositories/EventsRepositories';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  place: string;
  day: string;
  title: string;
  category: string;
  description: string;
  tickets_avaiable: number;
  start_time: string;
  end_time: string;
}

class UpdateEventService {
  public async execute({
    id,
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
    const event = await eventsRepository.findById(id);

    if (!event) {
      throw new AppError('Event not found.');
    }
    //ver se o dia foi preenchudi. se tiver, verificar se já tem evento.
    //se o dia tiver evento, observar se o local tem evento
    // se o local tiver evento e a hora for diferente da nova hora, cadastrar
    // se o local tiver evento e a hora for igual a nova hora, cancelar

    const dayHaveEvent = await eventsRepository.findByDay(day);
    const placeHaveEvent = await eventsRepository.findByPlace(place);
    const eventStartTime = await eventsRepository.findByStartTime(start_time);
    const eventEndTime = await eventsRepository.findByEndTime(end_time);

    if (day || place || start_time) {
      if (day) {
        if (day !== dayHaveEvent?.day) {
          event.day = day;
        }
        if (day == dayHaveEvent?.day) {
          if (dayHaveEvent?.place !== place) {
            event.place = place;
          }
          if (dayHaveEvent.place == place) {
            if (dayHaveEvent?.start_time !== start_time) {
              event.start_time = start_time;
            } else {
              throw new AppError(
                'There is another event in this location at this time',
              );
            }
          }
        }
      }
    }

    event.title = title;
    event.category = category;
    event.description = description;
    event.tickets_avaiable = tickets_avaiable;

    await eventsRepository.save(event);

    return event;
  }
}

export default UpdateEventService;

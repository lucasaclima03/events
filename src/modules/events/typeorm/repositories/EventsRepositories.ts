import { EntityRepository, Repository } from 'typeorm';
import Event from '../entities/Event';

@EntityRepository(Event)
class EventsRepository extends Repository<Event> {
  public async findByDay(day: string): Promise<Event | undefined> {
    const event = await this.findOne({
      where: { day },
    });
    return event;
  }

  public async findById(id: string): Promise<Event | undefined> {
    const event = await this.findOne({
      where: { id },
    });
    return event;
  }

  public async findByHour(hour: string): Promise<Event | undefined> {
    const event = await this.findOne({
      where: hour,
    });

    return event;
  }

  public async findByPlace(place: string): Promise<Event | undefined> {
    const event = await this.findOne({ where: place });
    return event;
  }
}
export default EventsRepository;

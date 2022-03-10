import { Request, Response } from 'express';
import CreateEventService from '../services/CreateEventService';

export default class EventsController {
  public async create(request: Request, response: Response) {
    const {
      place,
      day,
      title,
      category,
      description,
      tickets_avaiable,
      start_time,
      end_time,
    } = request.body;
    const createEvent = new CreateEventService();
    const event = createEvent.execute({
      place,
      day,
      title,
      category,
      description,
      tickets_avaiable,
      start_time,
      end_time,
    });

    return response.json(event);
  }
}

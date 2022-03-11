import { Request, response, Response } from 'express';
import CreateEventService from '../services/CreateEventService';
import ListEventService from '../services/ListEventsService';

export default class EventsController {
  public async create(request: Request, response: Response): Promise<Response> {
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
    const event = await createEvent.execute({
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

  public async index(request: Request, response: Response): Promise<Response> {
    const listEvents = new ListEventService();
    const events = await listEvents.execute();
    return response.json(events);
  }
}

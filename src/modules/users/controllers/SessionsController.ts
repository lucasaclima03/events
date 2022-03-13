import { Request, Response } from 'express';
import CreateAdminSessionService from '../services/CreateAdminSessionService';
import CreateSessionsService from '../services/CreateSessionsService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionsService();
    const user = await createSession.execute({ email, password });

    return response.json(user);
  }

  public async createAdminSession(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateAdminSessionService();
    const user = await createSession.execute({ email, password });

    return response.json(user);
  }
}

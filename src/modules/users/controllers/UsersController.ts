import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ email, password });
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { email, new_password, old_password } = request.body;
    const { id } = request.params;

    const updateUser = new UpdateUserService();
    const user = await updateUser.execute({
      id,
      email,
      new_password,
      old_password,
    });

    return response.json(user);
  }
}

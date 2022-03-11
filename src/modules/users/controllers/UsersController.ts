import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
  public async index(request: Request, response: Response) {
    const listUser = new ListUserService();
    const users = await listUser.execute();

    return response.json(users);
  }

  /*
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowUserService();
    const user_id = request.user.id;
    const user = await showProfile.execute({ user_id });

    return response.json(user);
  }
  */

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ email, password });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { email, new_password, old_password } = request.body;

    const updateUser = new UpdateUserService();
    const user = await updateUser.execute({
      id,
      email,
      new_password,
      old_password,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUser = new DeleteUserService();
    const remove = await deleteUser.execute({ id });
    return response.json([]);
  }
}

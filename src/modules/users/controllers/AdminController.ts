import { Request, Response } from 'express';
import CreateAdminUserService from '../services/CreateAdminUserService';

export default class AdminUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password, is_admin } = request.body;
    const createAdmin = new CreateAdminUserService();
    const user = await createAdmin.execute({ email, password, is_admin });

    return response.json(user);
  }
}

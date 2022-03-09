import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  email: string;
  new_password: string;
  old_password: string;
}

class UpdateUserService {
  public async execute({
    id,
    email,
    new_password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found');
    }

    const userEmailExists = await usersRepository.findByEmail(email);
    if (userEmailExists && userEmailExists.id != user.id) {
      throw new AppError('This email already used');
    }

    if (new_password && !old_password) {
      throw new AppError('Old password is required');
    }

    if (new_password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError('Old password dows not match');
      }
      user.password = await hash(new_password, 8);
    }

    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;

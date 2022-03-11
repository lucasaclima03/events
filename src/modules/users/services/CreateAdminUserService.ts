import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
  is_admin: number;
}

class CreateAdminUserService {
  public async execute({ email, password, is_admin }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email already in use');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      email,
      password: hashedPassword,
      is_admin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateAdminUserService;

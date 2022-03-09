import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
  cpf: string;
}

class CreateUserService {
  public async execute({ email, password, cpf }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email already in use');
    }
    if (cpf.length !== 11) {
      throw new AppError('Your CPF must have at least 11 numbers');
    }

    const hashedPassword = await hash(password, 8);

    const user = await usersRepository.create({
      email,
      password: hashedPassword,
      cpf,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;

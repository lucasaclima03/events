import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { email },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { id },
    });
    return user;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { name },
    });
    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { cpf },
    });

    return user;
  }
  public async findAdmin(is_admin: number): Promise<User[] | undefined> {
    const user = await this.find({ where: { is_admin: is_admin } });
    return user;
  }
}

export default UsersRepository;

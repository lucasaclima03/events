import Event from '@modules/events/typeorm/entities/Event';
import Order from '@modules/orders/typeorm/entities/Order';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Order, order => order.user)
  order: Order;

  @Column({ length: 11 })
  cpf: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  is_admin: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;

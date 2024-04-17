import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import Token from './token.entity';

@Entity('users')
@Unique(['id'])
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  id: string;

  @Column()
  password: string;

  @OneToMany(() => Token, (token) => token.user, {
    cascade: ['insert', 'update'],
  })
  tokens: Token[];
}

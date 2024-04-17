import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId,
  JoinColumn,
} from 'typeorm';
import User from './user.entity';

@Entity('tokens')
export default class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  payload: string;

  @ManyToOne(() => User, (user) => user.tokens, {
    cascade: ['remove'],
  })
  @RelationId('user')
  @JoinColumn({ name: 'userId' })
  user: string;
}

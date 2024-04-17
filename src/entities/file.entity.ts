import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('files')
export default class File extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  name: string;

  @Column()
  originalName: string;

  @Column()
  mimeType: string;

  @Column()
  extension: string;

  @Column()
  size: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

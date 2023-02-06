import { Exclude } from 'class-transformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('datetime')
  appointmentDate: Date;

  @Column()
  phone: string;

  @Column()
  email: string;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;
}

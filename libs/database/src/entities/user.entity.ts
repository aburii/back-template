import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text'})
  @IsEmail({ message: "Email is invalid"})
  email: string;

  @Column({ nullable: false, type: 'text' })
  password: string;
}

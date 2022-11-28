import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VerificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, type: 'int'})
  user_id: number;

  @Column({unique: true, type: 'int'})
  code: number;
}

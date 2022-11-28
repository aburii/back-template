import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class VerificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, type: 'int'})
  user_id: number;

  @Column({unique: true, type: 'int'})
  code: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

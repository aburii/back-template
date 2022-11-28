import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationEntity } from './verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationEntity])],
  providers: [VerificationEntity],
  exports: [VerificationEntity]
})
export class VerificationModule {}

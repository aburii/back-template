import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationEntity } from './verification.entity';
import { VerificationRepository } from './verification.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationEntity])],
  providers: [VerificationRepository],
  exports: [VerificationRepository]
})
export class VerificationModule {}

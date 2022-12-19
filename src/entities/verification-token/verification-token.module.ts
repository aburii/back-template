import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationToken } from './verification-token.entity';
import { VerificationTokenRepository } from './verification-token.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationToken])],
  providers: [VerificationTokenRepository],
  exports: [VerificationTokenRepository],
})
export class VerificationModule {}

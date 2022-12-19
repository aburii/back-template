import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../../strategies/local.strategy';
import { JwtService } from '@nestjs/jwt';
import { JwtAtStrategy } from '../../strategies/jwt-at.strategy';
import { JwtRtStrategy } from '../../strategies/jwt-rt.strategy';
import { HashService } from '../../hash/hash.service';
import { MailService } from '../../mailer/mail.service';
import { UserRepository } from '../../entities/user/user.repository';
import { VerificationTokenRepository } from '../../entities/verification-token/verification-token.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAtStrategy,
    JwtRtStrategy,
    HashService,
    MailService,
    UserRepository,
    VerificationTokenRepository,
    JwtService,
  ],
})
export class AuthModule {}

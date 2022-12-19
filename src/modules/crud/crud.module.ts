import { Module } from '@nestjs/common';
import { TasksService } from './cron/cron.service';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';
import { JwtAtStrategy } from '../../strategies/jwt-at.strategy';
import { HashService } from '../../hash/hash.service';
import { MailService } from '../../mailer/mail.service';
import { UserRepository } from '../../entities/user/user.repository';
import { VerificationTokenRepository } from '../../entities/verification-token/verification-token.repository';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [CrudController],
  providers: [
    CrudService,
    JwtAtStrategy,
    HashService,
    TasksService,
    MailService,
    UserRepository,
    VerificationTokenRepository,
  ],
})
export class CrudModule {}

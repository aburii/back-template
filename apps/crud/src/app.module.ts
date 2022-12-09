import { Module } from '@nestjs/common';
import { CrudController } from './app.controller';
import { CrudService } from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { config } from 'config';
import { JwtAtStrategy, User, UserModule } from '@app/user';
import { DatabaseModule } from '@app/database/dist/src/database.module';
import { HashService } from '@app/hash';
import { VerificationEntity, VerificationModule } from '@app/verification-tokens';
import {ConfigurableMailerModule, MailService} from '@app/mailer';
import {ScheduleModule} from "@nestjs/schedule";
import {TasksService} from "./cron/cron.service";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config]
    }),
    DatabaseModule.register({
      type: 'mysql',
      entities: [User, VerificationEntity],
      migrations: [__dirname + "../migrations/*.{ts|js}"]
    }),
    ConfigurableMailerModule.register(),
    UserModule,
    VerificationModule,
  ],
  controllers: [CrudController],
  providers: [CrudService, JwtAtStrategy, HashService, TasksService, MailService],
})
export class CrudModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './app.controller';
import { AuthService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from 'config'
import { DatabaseModule } from '@app/database';
import {JwtAtGuard, JwtAtStrategy, JwtRtStrategy, User, UserModule} from '@app/user';
import { LocalStrategy } from './passport/local.strategy';
import { VerificationEntity, VerificationModule } from '@app/verification-tokens';
import { ConfigurableMailerModule } from '@app/mailer';
import { HashService } from '@app/hash';
import {APP_GUARD} from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config]
    }),
    UserModule,
    VerificationModule,
    ConfigurableMailerModule.register(),
    DatabaseModule.register({
      type: 'mysql',
      entities: [User, VerificationEntity],
      migrations: [__dirname + "../migrations/*.{ts|js}"],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAtStrategy,
    JwtRtStrategy,
    HashService
  ],
})
export class AuthModule {}

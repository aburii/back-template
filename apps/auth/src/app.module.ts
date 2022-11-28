import { Module } from '@nestjs/common';
import { AuthController } from './app.controller';
import { AuthService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from 'config'
import { DatabaseModule } from '@app/database/dist/src/database.module';
import { JwtStrategy, User, UserModule } from '@app/user';
import { LocalStrategy } from './passport/local.strategy';
import { VerificationEntity, VerificationModule } from '@app/verification-tokens';
import { ConfigurableMailerModule } from '@app/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config]
    }),
    UserModule,
    VerificationModule,
    ConfigurableMailerModule.register({
      author: "No Reply <mail@gmail.com>",
      templates:__dirname + "../mail/templates",
    }),
    DatabaseModule.register({
      type: 'mysql',
      entities: [User, VerificationEntity],
      migrations: [__dirname + "../migrations/*.{ts|js}"],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

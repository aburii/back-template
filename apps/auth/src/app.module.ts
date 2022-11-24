import { Module } from '@nestjs/common';
import { AuthController } from './app.controller';
import { AuthService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from 'config'
import { DatabaseModule } from '@app/database/dist/src/database.module';
import { JwtStrategy, User, UserModule } from '@app/user';
import { LocalStrategy } from './passport/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config]
    }),
    UserModule,
    DatabaseModule.register({
      type: 'mysql',
      entities: [User],
      migrations: [__dirname + "../migrations/*.{ts|js}"],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './app.controller';
import { AuthService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from 'config'
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config]
    }),
    DatabaseModule.register({
      type: 'mongodb',
      logging: false,
      migrations: [],
      entities: []
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

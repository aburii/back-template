import { Module } from '@nestjs/common';
import { AuthController } from './app.controller';
import { AuthService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          database: (configService.get<string>('env') == 'development') ? 'test' : configService.get<string>('database.name'),
          logging: false,
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          synchronize: configService.get<string>('env') == 'development',
          migrations: ["../migrations/*.{js|ts}"],
          entities: [],
          retryAttempts: 1,
          retryWrites: true,
          verboseRetryLog: true,
        }
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

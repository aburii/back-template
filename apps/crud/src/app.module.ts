import { Module } from '@nestjs/common';
import { CrudController } from './app.controller';
import { CrudService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserModule, UserRepository } from '@app/user';

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
          entities: [User],
          retryAttempts: 1,
          retryWrites: true,
          verboseRetryLog: true,
        }
      }
    }),
    UserModule,
  ],
  controllers: [CrudController],
  providers: [CrudService],
})
export class CrudModule {}

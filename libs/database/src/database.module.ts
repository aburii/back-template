import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { IDatabaseOptions } from './interface/IDatabaseOptions';

@Module({})
export class DatabaseModule {
  static register(options: IDatabaseOptions): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      imports: [TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
              type: options.type,
              host: configService.get<string>('database.host'),
              port: configService.get<number>('database.port'),
              database: configService.get<string>('env') === 'development' ? 'test' : configService.get<string>('database.name'),
              logging: options.logging,
              username: configService.get<string>('database.username'),
              password: configService.get<string>('database.password'),
              synchronize: configService.get<string>('env') === 'development',
              migrations: ["../migrations/*.{js|ts}"],
              entities: ["dist/**/*.entity.js"],
              retryAttempts: 1,
              retryWrites: true,
              verboseRetryLog: true,
        })
      })],
      providers: [DatabaseService],
      exports: [DatabaseService],
    };
  };
}


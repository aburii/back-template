import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export interface DatabaseOptions {
  type: 'mongodb' | 'mysql', // Add as more type of database as u want
  logging: boolean,
  migrations: Array<string>,
  entities: Array<string>
}

@Module({})
export class DatabaseModule {
  static register(options: DatabaseOptions): DynamicModule {
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
              migrations: options.migrations,
              entities: options.entities,
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


import { DynamicModule, Module } from '@nestjs/common';
import { MixedList } from 'typeorm/common/MixedList';
import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

interface IDatabaseOptions {
  type: 'mysql' | 'mongodb',
  entities: MixedList<Function | string | EntitySchema>,
  migrations: string[]
}

@Module({})
export class DatabaseModule {
  static register(options: IDatabaseOptions): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      imports: [TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          return {
            type: options.type,
            host: configService.get<string>('database.host'),
            port: configService.get<number>('database.port'),
            database: (configService.get<string>('env') == 'development') ? 'test' : configService.get<string>('database.name'),
            username: configService.get<string>('database.username'),
            password: configService.get<string>('database.password'),
            synchronize: configService.get<string>('env') == 'development',
            migrations: options.migrations,
            entities: options.entities,
          }
        }
      })],
    };
  };
}

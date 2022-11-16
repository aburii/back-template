import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';

@Module({})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      imports: [ConfigModule],
      providers: [DatabaseService],
      exports: [DatabaseService],
    };
  }
}


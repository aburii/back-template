import { Module } from '@nestjs/common';
import { CrudController } from './app.controller';
import { CrudService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from 'config';
import { DatabaseModule, User } from '@app/database';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config]
    }),
    DatabaseModule.register({
      type: 'mysql',
      logging: true,
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [CrudController],
  providers: [CrudService],
})
export class CrudModule {}

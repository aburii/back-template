import { Module } from '@nestjs/common';
import { CrudController } from './app.controller';
import { CrudService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from 'config';
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
    })
  ],
  controllers: [CrudController],
  providers: [CrudService],
})
export class CrudModule {}

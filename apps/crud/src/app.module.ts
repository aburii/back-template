import { Module } from '@nestjs/common';
import { CrudController } from './app.controller';
import { CrudService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from 'config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [config]
  })],
  controllers: [CrudController],
  providers: [CrudService],
})
export class CrudModule {}

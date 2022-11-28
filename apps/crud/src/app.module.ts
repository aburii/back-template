import { Module } from '@nestjs/common';
import { CrudController } from './app.controller';
import { CrudService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from 'config';
import { JwtStrategy, User, UserModule } from '@app/user';
import { DatabaseModule } from '@app/database/dist/src/database.module';
import { HashService } from '@app/hash';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config]
    }),
    DatabaseModule.register({
      type: 'mysql',
      entities: [User],
      migrations: [__dirname + "../migrations/*.{ts|js}"]
    }),
    UserModule,
  ],
  controllers: [CrudController],
  providers: [CrudService, JwtStrategy, HashService],
})
export class CrudModule {}

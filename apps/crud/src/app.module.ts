import { Module } from '@nestjs/common';
import { CrudController } from './app.controller';
import { CrudService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from 'config';
import { JwtStrategy, User, UserModule } from '@app/user';
import { DatabaseModule } from '@app/database/dist/src/database.module';
import { HashService } from '@app/hash';
import { VerificationEntity, VerificationModule } from '@app/verification-tokens';
import { ConfigurableMailerModule } from '@app/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config]
    }),
    DatabaseModule.register({
      type: 'mysql',
      entities: [User, VerificationEntity],
      migrations: [__dirname + "../migrations/*.{ts|js}"]
    }),
    ConfigurableMailerModule.register({
      author: "No Reply <mail@gmail.com>",
      templates: __dirname + "../mail/templates",
    }),
    UserModule,
    VerificationModule,
  ],
  controllers: [CrudController],
  providers: [CrudService, JwtStrategy, HashService],
})
export class CrudModule {}

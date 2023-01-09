import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './entities/user/user.entity';
import { VerificationToken } from './entities/verification-token/verification-token.entity';
import { ConfigurableMailerModule } from './mailer/mail.module';
import { UserModule } from './entities/user/user.module';
import { VerificationModule } from './entities/verification-token/verification-token.module';
import { CrudModule } from './modules/crud/crud.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        synchronize: configService.get<string>('env') == 'development',
        migrations: [''],
        entities: [User, VerificationToken],
      }),
    }),
    ConfigurableMailerModule.register(),
    AuthModule,
    CrudModule,
    UserModule,
    VerificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

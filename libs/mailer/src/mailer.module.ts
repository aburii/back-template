import { DynamicModule, Module } from '@nestjs/common';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({})
export class ConfigurableMailerModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: ConfigurableMailerModule,
      imports : [MailerModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
        {
          return {
          transport: {
            host: configService.get<string>('mailer.host'),
            secure: false,
            auth: {
              user: configService.get<string>('mailer.auth.user'),
              pass: configService.get<string>('mailer.auth.password'),
            },
          },
          defaults: {
            from: `"App" <${configService.get<string>('mailer.auth.user')}>`,
          },
          template: {
            dir: __dirname + '/../templates',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            }
          }
        }}
      })
      ],
      providers: [MailService],
      exports: [MailService],
    }
  }
}

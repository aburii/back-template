import { DynamicModule, Module } from '@nestjs/common';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export interface MailerOptions {
  author: string,
  templates: string,
}

@Module({})
export class ConfigurableMailerModule {
  static register(options: MailerOptions): DynamicModule {
    return {
      global: true,
      module: ConfigurableMailerModule,
      imports : [MailerModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: {
            host: configService.get<string>('mailer.host'),
            secure: true,
            port: configService.get<number>('mailer.port'),
            auth: {
              user: configService.get<string>('mailer.auth.user'),
              pass: configService.get<string>('mailer.auth.password'),
            },
          },
          defaults: {
            from: options.author,
          },
          template: {
            dir: options.templates,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            }
          }
        })
      })
      ],
      providers: [MailService],
      exports: [MailService],
    }
  }
}

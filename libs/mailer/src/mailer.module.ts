import { DynamicModule, Module } from '@nestjs/common';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

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
        useFactory: (configService: ConfigService) => ({
          transport: {
            host: configService.get<string>('mailer.host'),
            secure: false,
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
            adapter: new PugAdapter(),
            options: {
              strict: true,
            }
          }
        })
      })
      ],
      providers: [MailerService],
      exports: [MailerService]
    }
  }
}

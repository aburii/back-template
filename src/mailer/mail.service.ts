import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../entities/user/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationCode(user: User, token: number) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Your Verification Code',
        template: './confirmation',
        context: {
          token: token.toString(),
          email: user.email,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}

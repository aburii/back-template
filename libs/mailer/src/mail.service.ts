import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
  }

  async sendEmailVerification(email: string) {

  }
}

export namespace Mail {
  export interface Content {
    to: string,
    object: string,
    content: string,
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { VerificationTokenRepository } from '../../../entities/verification-token/verification-token.repository';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(
    private readonly verificationRepository: VerificationTokenRepository,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    const tokens = await this.verificationRepository.find({});
    const curSeconds = new Date().getTime() / 1000;
    for (const token of tokens) {
      const created = token.updated_at.getTime() / 1000 + 3600;
      if (curSeconds - created >= 300) {
        await this.verificationRepository.delete({ id: token.id });
      }
    }
  }
}

import {Injectable, Logger} from "@nestjs/common";
import {Cron, CronExpression} from "@nestjs/schedule";
import {VerificationRepository} from "@app/verification-tokens";

@Injectable()
export class TasksService {
    constructor(private readonly verificationRepository: VerificationRepository) {
    }
    private readonly logger = new Logger(TasksService.name);

    @Cron(CronExpression.EVERY_30_SECONDS)
    async handleCron() {
        const tokens = await this.verificationRepository.find({});
        const curSeconds = (new Date().getTime()) / 1000
        for (const token of tokens) {
            const created = (token.created_at.getTime() / 1000) + 3600;
            if (curSeconds - created >= 300) {
                await this.verificationRepository.delete({id: token.id})
            }
        }
    }
}
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { VerificationToken } from './verification-token.entity';
import { QueryFailedException } from '../../exceptions/query-failed.exception';

@Injectable()
export class VerificationTokenRepository extends Repository<VerificationToken> {
  constructor(private readonly dataSource: DataSource) {
    super(VerificationToken, dataSource.createEntityManager());
  }

  async generateVerificationCode(id: number) {
    const code = Math.floor(100000 + Math.random() * 900000);
    try {
      const token = await this.findOneBy({ user_id: id });
      if (!token) await this.insert({ user_id: id, code });
      else await this.update({ user_id: id }, { code: code });
      return code;
    } catch (e) {
      throw new QueryFailedException(e.message, e.driverError.code);
    }
  }
}

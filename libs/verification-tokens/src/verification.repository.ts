import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { VerificationEntity } from './verification.entity';
import {QueryFailedException} from "@app/database";

@Injectable()
export class VerificationRepository extends Repository<VerificationEntity>{
  constructor(private readonly dataSource: DataSource) {
    super(VerificationEntity, dataSource.createEntityManager());
  }

  async generateVerificationCode(id: number) {
    const code = Math.floor(100000 + Math.random() * 900000);
    try {
      const token = await this.findOneBy({user_id: id});
      if (!token)
        await this.insert({user_id: id, code})
      else
        await this.update({user_id: id}, {code: code})
      return code;
    } catch (e) {
      throw new QueryFailedException(e.message, e.driverError.code);
    }
  }
}

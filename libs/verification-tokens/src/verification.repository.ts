import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { VerificationEntity } from './verification.entity';

@Injectable()
export class VerificationRepository extends Repository<VerificationEntity>{
  constructor(private readonly dataSource: DataSource) {
    super(VerificationEntity, dataSource.createEntityManager());
  }
}

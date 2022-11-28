import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt'

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {
  }

  private getSaltRounds(): number {
    const value = this.configService.get<string>('bcrypt.saltRounds') || 12;
    return parseInt(value.toString(), 10);
  }

  async encode(password: string | Buffer): Promise<string> {
    return hash(password, this.getSaltRounds());
  }

  async isMatch(password: string | Buffer, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}

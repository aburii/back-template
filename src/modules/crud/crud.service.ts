import { Injectable, UseFilters } from '@nestjs/common';
import { DeleteResult, InsertResult } from 'typeorm';
import { QueryFailedFilter } from '../../filters/query-failed.filter';
import { UserRepository } from '../../entities/user/user.repository';
import { HashService } from '../../hash/hash.service';
import { MailService } from '../../mailer/mail.service';
import { QueryFailedException } from '../../exceptions/query-failed.exception';
import { VerificationTokenRepository } from '../../entities/verification-token/verification-token.repository';
import { User } from '../../entities/user/user.entity';
import {
  UpdatePasswordDto,
  UpdateUserDto,
} from '../../entities/user/update-user.dto';
@Injectable()
@UseFilters(new QueryFailedFilter())
export class CrudService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly verificationRepository: VerificationTokenRepository,
    private readonly hashService: HashService,
    private readonly mailService: MailService,
  ) {}

  async generateVerificationCode(id: number): Promise<number> {
    const code = Math.floor(100000 + Math.random() * 900000);
    try {
      await this.verificationRepository.insert({ user_id: id, code });
      return code;
    } catch (e) {
      throw new QueryFailedException(e.message, e.driverError.code);
    }
  }

  async findAllUsers(): Promise<Array<User>> {
    return await this.usersRepository.findAll();
  }

  async findUserById(id: number): Promise<User> {
    return await this.usersRepository.findById(id);
  }

  async updateUser(id: number, update: UpdateUserDto) {
    try {
      await this.usersRepository.update({ id: id }, update);
    } catch (e) {
      throw new QueryFailedException(e.message, e.driverError.code);
    }
  }

  async updatePassword(id: number, update: UpdatePasswordDto) {
    try {
      const hash = await this.hashService.encode(update.password);
      await this.usersRepository.update({ id: id }, { password: hash });
    } catch (e) {
      throw new QueryFailedException(e.message, e.driverError.code);
    }
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
    try {
      return await this.usersRepository.delete(id);
    } catch (e) {
      throw new QueryFailedException(e.message, e.driverError.code);
    }
  }
}

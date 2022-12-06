import {
  Injectable,
  UseFilters
} from '@nestjs/common';
import { QueryFailedException, QueryFailedFilter } from '@app/database';
import { DeleteResult, InsertResult } from 'typeorm';
import { User, UserRepository } from '@app/user';
import { HashService } from '@app/hash';
import { VerificationRepository } from '@app/verification-tokens';
import {MailService} from "@app/mailer";

@Injectable()
@UseFilters(new QueryFailedFilter())
export class CrudService {

  constructor(
    private readonly usersRepository: UserRepository,
    private readonly verificationRepository: VerificationRepository,
    private readonly hashService: HashService,
    private readonly mailService: MailService,
    ) {}

  async generateVerificationCode(id: number): Promise<number> {
    const code = Math.floor(100000 + Math.random() * 900000);
    try {
      await this.verificationRepository.insert({user_id: id, code})
      return code;
    } catch (e) {
      throw new QueryFailedException(e.message, e.driverError.code);
    }
  }

  async findAllUsers(): Promise<Array<User>> {
    try {
      return await this.usersRepository.find();
    } catch (e) {
      throw new QueryFailedException(e.message, e.driverError.code);
    }
  }

  async findUserById(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneBy({id: id});
    } catch (e) {
      throw new QueryFailedException(e.message, e.driverError.code);
    }
  }

  async insertUser(email: string, pass: string): Promise<InsertResult> {
    try {
      const myHash = await this.hashService.encode(pass);
      const insertionResult = await this.usersRepository.insert({
        email: email,
        password: myHash.toString(),
        is_verified: false
      });
      const user = await this.findUserById(insertionResult.raw.insertId);
      const code = await this.verificationRepository.generateVerificationCode(user.id);
      await this.mailService.sendVerificationCode(user, code)
      return insertionResult;
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

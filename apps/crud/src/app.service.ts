import {
  Injectable,
  UseFilters
} from '@nestjs/common';
import { QueryFailedException, QueryFailedFilter } from '@app/database';
import { DeleteResult, InsertResult } from 'typeorm';
import { User, UserRepository } from '@app/user';
import { HashService } from '@app/hash';

@Injectable()
@UseFilters(new QueryFailedFilter())
export class CrudService {

  constructor(
    private readonly usersRepository: UserRepository,
    private readonly hashService: HashService,
    ) {}

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

  async insertUser(email: string, password: string): Promise<InsertResult> {
    try {
      const myHash = await this.hashService.encode(password);
      return await this.usersRepository.insert({email, password: myHash});
    } catch (e) {
      console.log(e)
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

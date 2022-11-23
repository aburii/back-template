import {
  Injectable, InternalServerErrorException,
  UseFilters
} from '@nestjs/common';
import { QueryFailedFilter } from '@app/database';
import { DeleteResult, InsertResult } from 'typeorm';
import { User, UserRepository } from '@app/user';

@Injectable()
@UseFilters(new QueryFailedFilter())
export class CrudService {

  constructor(private readonly usersRepository: UserRepository) {}

  async findAllUsers(): Promise<Array<User>> {
    return await this.usersRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({id: id});
  }

  async insertUser(email: string, password: string): Promise<InsertResult> {
    return await this.usersRepository.insert({email, password});
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}

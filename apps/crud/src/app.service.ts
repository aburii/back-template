import { Injectable } from '@nestjs/common';
import { User } from '@app/database';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository } from 'typeorm';

@Injectable()
export class CrudService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<Array<User>> {
    return await this.usersRepository.find()
  }

  async insertUser(email: string, password: string): Promise<InsertResult> {
    return await this.usersRepository.insert({email, password});
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id)
  }

  async findUserById(id: number) {
    return await this.usersRepository.findOneBy({id: id});
  }
}

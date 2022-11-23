import { DataSource, DeleteResult, InsertResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findAllUsers(): Promise<Array<User>> {
    return await this.find()
  }

  async findUserById(id: number): Promise<User> {
    return await this.findOneBy({id: id});
  }

  async insertUser(email: string, password: string): Promise<InsertResult> {
    return await this.insert({email, password});
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
    return await this.delete(id)
  }
}

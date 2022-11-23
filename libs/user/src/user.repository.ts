import { DataSource, DeleteResult, InsertResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { QueryFailedException } from '@app/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findAllUsers(): Promise<Array<User>> {
    try {
      return await this.find()
    } catch (e) {
      throw new QueryFailedException(e.message, e.driverError.code);
    }
  }

  async findUserById(id: number): Promise<User> {
    try {
      return await this.findOneBy({id: id});
    } catch (e) {
      throw new QueryFailedException(e.message, e.driverError.code);
    }
  }

  async insertUser(email: string, password: string): Promise<InsertResult> {
    try {
      return await this.insert({email, password});
    } catch (e) {
      throw new QueryFailedException(e.message, e.driverError.code);
    }
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
    try {
      return await this.delete(id)
    } catch (e) {
      throw new QueryFailedException(e.message, e.driverError.code);
    }
  }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { CrudService } from './app.service';
import { User } from '@app/user';
import { DeleteResult, InsertResult, MongoRepository } from 'typeorm';
import { CreateUserDto } from '@app/user';

@Controller('users')
export class CrudController {
  constructor(private readonly appService: CrudService) {}

  @Get()
  async getUsers(): Promise<Array<User>> {
    return await this.appService.findAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.appService.findUserById(id);
  }

  @Post()
  async insertUser(@Body() body: CreateUserDto): Promise<InsertResult> {
    return await this.appService.insertUser(body.email, body.password);
  }

  @Delete(':id')
  async removeUser(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.appService.deleteUserById(id);
  }
}

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CrudService } from './app.service';
import { User } from '@app/database';

@Controller('users')
export class CrudController {
  constructor(private readonly appService: CrudService) {}

  @Get()
  async getUsers(): Promise<Array<User>> {
    return await this.appService.findAllUsers();
  }

  @Post()
  async insertUser(@Body() body: Omit<User, '_id'>): Promise<User> {
    return await this.appService.insertUser(body.email, body.password);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<User> {
    return await this.appService.deleteUserById(id);
  }
}

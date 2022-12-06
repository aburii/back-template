import {Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import { CrudService } from './app.service';
import { JwtAuthGuard, User } from '@app/user';
import { DeleteResult, InsertResult } from 'typeorm';
import { CreateUserDto } from '@app/user';
import {MailService} from "@app/mailer";

@Controller('users')
export class CrudController {
  constructor(
    private readonly appService: CrudService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<Array<User>> {
    return await this.appService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.appService.findUserById(id);
  }

  @Post()
  async insertUser(@Body() body: CreateUserDto): Promise<InsertResult> {
    try {
      return await this.appService.insertUser(body.email, body.password);
    } catch (e) {
      console.log(e)
      throw new HttpException('Error: ' + e.message, 500)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeUser(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.appService.deleteUserById(id);
  }
}

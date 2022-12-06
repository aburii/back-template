import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { CrudService } from './app.service';
import {JwtAuthGuard, UpdatePasswordDto, UpdateUserDto, User} from '@app/user';
import { DeleteResult, InsertResult } from 'typeorm';
import { CreateUserDto } from '@app/user';
import {MailService} from "@app/mailer";
import {UserVerifiedGuard} from "@app/verification-tokens";

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

  @UseGuards(JwtAuthGuard, UserVerifiedGuard)
  @Patch(':id')
  async patchUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return await this.appService.updateUser(id, body)
  }

  @UseGuards(JwtAuthGuard, UserVerifiedGuard)
  @Patch(':id/password')
  async patchPassword(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePasswordDto) {
    return await this.appService.updatePassword(id, body);
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

  @UseGuards(JwtAuthGuard, UserVerifiedGuard)
  @Delete(':id')
  async removeUser(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.appService.deleteUserById(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards
} from '@nestjs/common';
import { CrudService } from './app.service';
import {JwtAtGuard, UpdatePasswordDto, UpdateUserDto, User} from '@app/user';
import { DeleteResult } from 'typeorm';
import {UserVerifiedGuard} from "@app/verification-tokens";

@UseGuards(JwtAtGuard)
@Controller('users')
export class CrudController {
  constructor(
    private readonly appService: CrudService,
  ) {}

  @Get()
  async getUsers(): Promise<Array<User>> {
    return await this.appService.findAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.appService.findUserById(id);
  }

  @UseGuards(UserVerifiedGuard)
  @Patch(':id')
  async patchUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return await this.appService.updateUser(id, body)
  }

  @UseGuards(UserVerifiedGuard)
  @Patch(':id/password')
  async patchPassword(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePasswordDto) {
    return await this.appService.updatePassword(id, body);
  }

  @UseGuards(UserVerifiedGuard)
  @Delete(':id')
  async removeUser(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.appService.deleteUserById(id);
  }
}

import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './app.service';
import { LocalGuard } from './passport/guards/local.guard';
import { JwtAuthGuard } from '@app/user';
import { JwtGuestGuard } from '@app/user/dist/src/jwt/guards/jwt-guest.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtGuestGuard, LocalGuard)
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user); // todo: return payload
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Req() req) {
    return req.user;
  }
}

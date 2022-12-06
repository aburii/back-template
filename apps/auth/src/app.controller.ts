import {Controller, Post, UseGuards, Req, HttpCode, HttpStatus, HttpException} from '@nestjs/common';
import { AuthService } from './app.service';
import { LocalGuard } from './passport/guards/local.guard';
import { JwtAuthGuard } from '@app/user';
import { JwtGuestGuard } from '@app/user/dist/src/jwt/guards/jwt-guest.guard';
import {UserNotVerifiedGuard} from "@app/verification-tokens";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtGuestGuard, LocalGuard)
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, UserNotVerifiedGuard)
  @Post('/verify')
  async verifyUser(@Req() req) {
    return await this.authService.verifyUser(req.user.sub, req.body.code);
  }

  @UseGuards(JwtAuthGuard, UserNotVerifiedGuard)
  @Post('/redeem-verification-code')
  @HttpCode(HttpStatus.OK)
  async redeemVerificationCode(@Req() req) {
    try {
      await this.authService.redeemVerificationCode(req.user.sub)
    } catch (e) {
      throw new HttpException({ message: "Failed to redeem another code" }, 500)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Req() req) {
    return req.user;
  }
}

import {Controller, Post, UseGuards, Req, HttpCode, HttpStatus, HttpException, Body, Get} from '@nestjs/common';
import { AuthService } from './app.service';
import { LocalGuard } from './passport/guards/local.guard';
import {CreateUserDto, IPayload, JwtAtGuard, JwtRtGuard, Tokens, User} from '@app/user';
import {UserNotVerifiedGuard} from "@app/verification-tokens";
import {Public} from "@app/common";
import {RequestUser} from "@app/common";

@UseGuards(JwtAtGuard)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async insertUser(@Body() body: CreateUserDto): Promise<Tokens> {
    try {
      return await this.authService.insertUser(body.email, body.password);
    } catch (e) {
      throw new HttpException('Error: ' + e.message, 500);
    }
  }

  @Public()
  @UseGuards(LocalGuard)
  @Post('/login')
  async login(@RequestUser() user: User) {
    return this.authService.login(user);
  }

  @UseGuards(UserNotVerifiedGuard)
  @Post('/verify')
  async verifyUser(@Req() req) {
    return await this.authService.verifyUser(req.user.sub, req.body.code);
  }

  @UseGuards(UserNotVerifiedGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/redeem-verification-code')
  async redeemVerificationCode(@Req() req) {
    try {
      await this.authService.redeemVerificationCode(req.user.sub)
    } catch (e) {
      throw new HttpException({ message: "Failed to redeem another code" }, 500)
    }
  }

  @Public()
  @UseGuards(JwtRtGuard)
  @Post('/refresh')
  async refreshTokens(@RequestUser() user) {
    return await this.authService.refresh(user.sub, user.refreshToken);
  }

  @Post('/logout')
  async logout(@RequestUser('sub') userId: number) {
    return await this.authService.removeRefreshToken(userId);
  }
}

import {
  Controller,
  Post,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  HttpException,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from '../../guards/local.guard';
import { JwtAtGuard } from '../../guards/jwt-at.guard';
import { Public } from '../../decorators/public.decorator';
import { CreateUserDto } from '../../entities/user/create-user.dto';
import { Tokens } from '../../jwt/tokens.type';
import { RequestUser } from '../../decorators/get-req-user.decorator';
import { User } from '../../entities/user/user.entity';
import { UserNotVerifiedGuard } from '../../guards/user-not-verified.guard';
import { JwtRtGuard } from '../../guards/jwt-rt.guard';

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
  @HttpCode(HttpStatus.CREATED)
  @Post('/redeem-verification-code')
  async redeemVerificationCode(@Req() req) {
    try {
      await this.authService.redeemVerificationCode(req.user.sub);
    } catch (e) {
      throw new HttpException(
        { message: 'Failed to redeem another code' },
        500,
      );
    }
  }

  @Public()
  @UseGuards(JwtRtGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/refresh')
  async refreshTokens(@RequestUser() user) {
    return await this.authService.refresh(user.sub, user.refreshToken);
  }

  @Post('/logout')
  async logout(@RequestUser('sub') userId: number) {
    return await this.authService.removeRefreshToken(userId);
  }
}

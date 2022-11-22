import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './app.service';

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get('/login')
  async login(@Body() username: string, @Body() password: string) {
    return this.appService.validateUser(username, password);
  }
}

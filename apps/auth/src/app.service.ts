import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserCredentialsDto, UserRepository } from '@app/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(credentials: UserCredentialsDto) {
    const user = await this.usersRepository.findOneBy({ email: credentials.email });

    // todo: decrypt credentials password
    if (!user) {
      throw new NotFoundException()
    } else if (user.password !== credentials.password)
      throw new UnauthorizedException({ message: "Invalid password"})
    const { password, ...data} = user
    return data;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}

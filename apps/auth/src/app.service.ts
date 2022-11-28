import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserCredentialsDto, UserRepository } from '@app/user';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '@app/hash';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(credentials: UserCredentialsDto) {
    const user = await this.usersRepository.findOneBy({ email: credentials.email });

    const myvar = await this.hashService.isMatch(credentials.password, user.password)
    if (!user) {
      throw new NotFoundException()
    } else if (!(myvar))
      throw new UnauthorizedException({ message: "Invalid password"})
    const { password, ...data } = user
    return data;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}

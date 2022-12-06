import {HttpStatus, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { UserCredentialsDto, UserRepository } from '@app/user';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '@app/hash';
import {VerificationRepository} from "@app/verification-tokens";
import {MailService} from "@app/mailer";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly verificationRepository: VerificationRepository,
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
    const payload = { verified: user.is_verified, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async verifyUser(userId: number, code: number) {
    const usersVerification = await this.verificationRepository.findOneBy({user_id: userId})
    if (usersVerification.code == code) {
      await this.verificationRepository.delete({id: usersVerification.id });
      await this.usersRepository.update({id: userId}, { is_verified: true })
    } else {
      throw new UnauthorizedException({ message: "Invalid code", statusCode: HttpStatus.BAD_REQUEST })
    }
    return {
      access_token: this.jwtService.sign({verified: true, sub: userId})
    }
  }

  async redeemVerificationCode(userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const code = await this.verificationRepository.generateVerificationCode(userId);
    await this.mailService.sendVerificationCode(user, code)
  }
}

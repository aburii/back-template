import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IsNull, Not } from 'typeorm';
import { UserRepository } from '../../entities/user/user.repository';
import { MailService } from '../../mailer/mail.service';
import { VerificationTokenRepository } from '../../entities/verification-token/verification-token.repository';
import { HashService } from '../../hash/hash.service';
import { UserCredentialsDto } from '../../entities/user/user-credentials.dto';
import { Tokens } from '../../jwt/tokens.type';
import { QueryFailedException } from '../../exceptions/query-failed.exception';
import { User } from '../../entities/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly verificationRepository: VerificationTokenRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async validateUser(credentials: UserCredentialsDto) {
    const user = await this.usersRepository.findOneBy({
      email: credentials.email,
    });

    const myvar = await this.hashService.isMatch(
      credentials.password,
      user.password,
    );
    if (!user) {
      throw new NotFoundException();
    } else if (!myvar)
      throw new UnauthorizedException({ message: 'Invalid password' });
    const { password, ...data } = user;
    return data;
  }

  async insertUser(email: string, pass: string): Promise<Tokens> {
    try {
      const myHash = await this.hashService.encode(pass);
      const insertionResult = await this.usersRepository.insert({
        email: email,
        password: myHash.toString(),
        is_verified: false,
      });
      const user = await this.usersRepository.findById(
        insertionResult.raw.insertId,
      );
      const code = await this.verificationRepository.generateVerificationCode(
        user.id,
      );
      await this.mailService.sendVerificationCode(user, code);
      return await this.generateAndUpdateTokens(user);
    } catch (e) {
      throw new QueryFailedException(e.message, e.driverError.code);
    }
  }

  async login(user: User) {
    return await this.generateAndUpdateTokens(user);
  }

  async refresh(userId: number, rt: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user.token_hash) throw new UnauthorizedException('Access denied');
    const rtMatch = await this.hashService.isMatch(rt, user.token_hash);
    if (!rtMatch)
      throw new UnauthorizedException({ message: 'Invalid Refresh Token' });
    return await this.generateAndUpdateTokens(user);
  }

  async verifyUser(userId: number, code: number) {
    const usersVerification = await this.verificationRepository.findOneBy({
      user_id: userId,
    });

    if (usersVerification && usersVerification.code == code) {
      await this.verificationRepository.delete({ id: usersVerification.id });
      await this.usersRepository.update({ id: userId }, { is_verified: true });
    } else {
      throw new UnauthorizedException({
        message: 'Invalid code',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
    return {
      verified: true,
    };
  }

  async redeemVerificationCode(userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const code = await this.verificationRepository.generateVerificationCode(
      userId,
    );
    await this.mailService.sendVerificationCode(user, code);
  }

  async generateTokens(user: User): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          verified: user.is_verified,
        },
        {
          secret: this.configService.get<string>('jwt.at-secret'),
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.id,
          verified: user.is_verified,
        },
        {
          secret: this.configService.get<string>('jwt.rt-secret'),
          expiresIn: '365d',
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: number, token: string) {
    const hash = await this.hashService.encode(token);
    await this.usersRepository.update({ id: userId }, { token_hash: hash });
  }

  async generateAndUpdateTokens(user: User): Promise<Tokens> {
    const tokens = await this.generateTokens(user);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async removeRefreshToken(userId: number) {
    await this.usersRepository.update(
      { id: userId, token_hash: Not(IsNull()) },
      { token_hash: null },
    );
  }
}

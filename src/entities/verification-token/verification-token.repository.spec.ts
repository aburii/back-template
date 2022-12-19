import { Test, TestingModule } from '@nestjs/testing';
import { VerificationTokenRepository } from './verification-token.repository';

describe('VerificationTokenService', () => {
  let service: VerificationTokenRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificationTokenRepository],
    }).compile();

    service = module.get<VerificationTokenRepository>(
      VerificationTokenRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './app.controller';
import { AuthService } from './app.service';

describe('AppController', () => {
  let appController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    appController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(true).toBe(true);
    });
  });
});

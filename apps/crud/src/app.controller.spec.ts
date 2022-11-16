import { Test, TestingModule } from '@nestjs/testing';
import { CrudController } from './app.controller';
import { CrudService } from './app.service';

describe('AppController', () => {
  let appController: CrudController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CrudController],
      providers: [CrudService],
    }).compile();

    appController = app.get<CrudController>(CrudController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

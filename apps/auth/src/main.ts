import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { boostrapApp } from '@app/nest-common';

async function bootstrap() {
  boostrapApp();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

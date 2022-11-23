import { NestFactory } from '@nestjs/core';
import { CrudModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CrudModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT')
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  await app.listen(port, () => { console.log("App is listening on port " + port)});
}
bootstrap();

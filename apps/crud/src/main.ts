import { NestFactory } from '@nestjs/core';
import { CrudModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(CrudModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT')
  await app.listen(port, () => { console.log("App is listening on port " + port)});
}
bootstrap();

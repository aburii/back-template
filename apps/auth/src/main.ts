import { NestFactory } from '@nestjs/core';
import { AuthModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port')
  await app.listen(port, () => { console.log("App is listening on port " + port)});
}
bootstrap();

import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/entities/user/user.entity';
import { VerificationToken } from './src/entities/verification-token/verification-token.entity';

config();

const configService = new ConfigService();

export const SqlDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database:
    process.env.NODE_ENV == 'development' ? 'test' : process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  synchronize: process.env.NODE_ENV == 'development',
  migrations: ['dist/migrations/*.js'],
  entities: ['dist/src/entities/**/*.entity.js'],
});

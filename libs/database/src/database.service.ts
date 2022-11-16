import { Injectable, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';
export interface IDatabaseConfig {
  uri: string,
  user: string,
  pwd: string,
}

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  public client: MongoClient;
  constructor(private readonly configService: ConfigService) {
    const databaseOptions = this.configService.get<IDatabaseConfig>('database');
    console.log(databaseOptions);
    this.client = new MongoClient(databaseOptions.uri);
  }

  async onModuleInit(): Promise<void> {
    this.client = await this.client.connect();
    console.log("Connected to db")
  }

  async onApplicationShutdown(signal?: string) {
    await this.client.close();
  }
}

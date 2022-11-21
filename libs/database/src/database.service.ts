import { Injectable, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export interface IDatabaseConfig {
  uri: string,
  user: string,
  pwd: string,
}

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  onApplicationShutdown(signal?: string): any {
  }

  onModuleInit(): any {
  }
}

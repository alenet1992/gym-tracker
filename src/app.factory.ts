import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';

let cachedApp: NestExpressApplication | null = null;

export async function createApp(): Promise<NestExpressApplication> {
  if (cachedApp) return cachedApp;

  // Use Nest's default Express 5 instance — passing Express 4 via ExpressAdapter
  // triggers "'app.router' is deprecated" during init (Nest 11 reads app.router).
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const databaseService = app.get(DatabaseService);
  await databaseService.connect();
  await app.init();

  cachedApp = app;
  return app;
}

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';

let cachedApp: NestExpressApplication | null = null;

export async function createApp(): Promise<NestExpressApplication> {
  if (cachedApp) return cachedApp;

  const expressApp = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  const databaseService = app.get(DatabaseService);
  await databaseService.connect();
  await app.init();

  cachedApp = app;
  return app;
}

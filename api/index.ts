import 'reflect-metadata';
import type { IncomingMessage, ServerResponse } from 'http';
import type { Express } from 'express';
import { createApp } from '../dist/app.factory';

let expressApp: Express | null = null;

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (!expressApp) {
    const nestApp = await createApp();
    expressApp = nestApp.getHttpAdapter().getInstance();
  }

  expressApp(req, res);
}

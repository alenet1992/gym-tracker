import 'reflect-metadata';
import { join } from 'path';
import type { Express } from 'express';

type VercelRequest = Parameters<Express>[0];
type VercelResponse = Parameters<Express>[1];

let expressApp: Express | null = null;
let initPromise: Promise<Express> | null = null;

function sendError(res: VercelResponse, status: number, message: string): void {
  if (res.headersSent) return;
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      error: 'FUNCTION_INVOCATION_FAILED',
      message,
    }),
  );
}

async function getExpressApp(): Promise<Express> {
  if (expressApp) return expressApp;

  if (!initPromise) {
    initPromise = (async () => {
      const distEntry = join(__dirname, '..', 'dist', 'app.factory');
      // Runtime require after `nest build` — avoids bundling issues on Vercel.
      const { createApp } = require(distEntry) as typeof import('../dist/app.factory');
      const nestApp = await createApp();
      return nestApp.getHttpAdapter().getInstance();
    })();
  }

  try {
    expressApp = await initPromise;
    return expressApp;
  } catch (err) {
    initPromise = null;
    throw err;
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  try {
    const app = await getExpressApp();
    await new Promise<void>((resolve, reject) => {
      app(req, res, (err: unknown) => (err ? reject(err) : resolve()));
    });
  } catch (err) {
    console.error('API handler error:', err);
    const message =
      err instanceof Error ? err.message : 'Unknown server error';
    sendError(res, 500, message);
  }
}

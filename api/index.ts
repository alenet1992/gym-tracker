import 'reflect-metadata';
import { createApp } from '../src/app.factory';

export default async function handler(req: unknown, res: unknown) {
  const app = await createApp();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
}

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DatabaseService } from '../database/database.service';
import { SeedService } from './seed.service';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const databaseService = app.get(DatabaseService);
  const seedService = app.get(SeedService);

  await databaseService.connect();
  await seedService.seedIfEmpty();
  await app.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

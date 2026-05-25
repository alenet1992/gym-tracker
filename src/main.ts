import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const databaseService = app.get(DatabaseService);
  await databaseService.connect();

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);

  console.log(`API a correr em http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Falha ao iniciar servidor:', err);
  process.exit(1);
});

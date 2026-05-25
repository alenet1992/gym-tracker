import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { SeedModule } from './seed/seed.module';
import { WorkoutPlansModule } from './workout-plans/workout-plans.module';

const isVercel = process.env.VERCEL === '1';
const isProduction = process.env.NODE_ENV === 'production';
const shouldServeStatic = isProduction && !isVercel;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    WorkoutPlansModule,
    SeedModule,
    ...(shouldServeStatic
      ? [
          ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'dist', 'client'),
            exclude: ['/api*'],
          }),
        ]
      : []),
  ],
  controllers: [AppController],
})
export class AppModule {}

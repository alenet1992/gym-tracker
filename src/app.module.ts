import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { SeedModule } from './seed/seed.module';
import { WorkoutPlansModule } from './workout-plans/workout-plans.module';

const isProduction = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    WorkoutPlansModule,
    SeedModule,
    ...(isProduction
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

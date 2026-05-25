import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient, type Db, type Collection } from 'mongodb';
import type { WorkoutPlan } from '../common/types/workout-plan.types';
import type { WorkoutSessionDocument } from '../common/types/workout-session.types';

export const WORKOUT_PLANS_COLLECTION = 'workout_plans';
export const WORKOUT_SESSIONS_COLLECTION = 'workout_sessions';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  constructor(private readonly configService: ConfigService) {}

  async connect(): Promise<Db> {
    if (this.db) return this.db;

    const isVercel = process.env.VERCEL === '1';
    const configuredUri = this.configService.get<string>('MONGODB_URI');
    const uri = configuredUri ?? 'mongodb://127.0.0.1:27017/gym-tracker';
    const dbName =
      this.configService.get<string>('MONGODB_DB_NAME') ?? 'gym-tracker';

    if (isVercel) {
      if (!configuredUri) {
        throw new Error(
          'MONGODB_URI is not set. Add it in Vercel → Project Settings → Environment Variables.',
        );
      }
      if (/localhost|127\.0\.0\.1/.test(uri)) {
        throw new Error(
          'MONGODB_URI cannot use localhost on Vercel. Use a MongoDB Atlas connection string.',
        );
      }
    }

    this.client = new MongoClient(uri, {
      serverSelectionTimeoutMS: isVercel ? 10_000 : 5_000,
    });
    await this.client.connect();
    this.db = this.client.db(dbName);
    return this.db;
  }

  getWorkoutPlansCollection(): Collection<WorkoutPlan> {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db.collection<WorkoutPlan>(WORKOUT_PLANS_COLLECTION);
  }

  getWorkoutSessionsCollection(): Collection<WorkoutSessionDocument> {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db.collection<WorkoutSessionDocument>(
      WORKOUT_SESSIONS_COLLECTION,
    );
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }
}

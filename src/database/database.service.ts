import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient, type Db, type Collection } from 'mongodb';
import type { WorkoutPlan } from '../common/types/workout-plan.types';

export const WORKOUT_PLANS_COLLECTION = 'workout_plans';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  constructor(private readonly configService: ConfigService) {}

  async connect(): Promise<Db> {
    if (this.db) return this.db;

    const uri =
      this.configService.get<string>('MONGODB_URI') ??
      'mongodb://127.0.0.1:27017/gym-tracker';
    const dbName =
      this.configService.get<string>('MONGODB_DB_NAME') ?? 'gym-tracker';

    this.client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
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

  async onModuleDestroy(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }
}

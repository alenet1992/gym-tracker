import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type {
  DayOfWeek,
  MealLogDocument,
  MealLogResponse,
  MealPlan,
  MealType,
  UpdateMealLogInput,
} from '../common/types/meal-plan.types';
import {
  DAY_OF_WEEK_LABELS,
  toMealLogResponse,
} from '../common/types/meal-plan.types';
import { DatabaseService } from '../database/database.service';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

@Injectable()
export class MealPlansService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findPlan(): Promise<MealPlan> {
    const collection = this.databaseService.getMealPlansCollection();
    const plan = await collection.findOne({ id: 'deficit-76kg' });

    if (!plan) {
      throw new NotFoundException('Plano alimentar não encontrado');
    }

    return plan;
  }

  async findAllLogs(): Promise<MealLogResponse[]> {
    const collection = this.databaseService.getMealLogsCollection();
    const logs = await collection.find({}).sort({ date: -1 }).toArray();
    return logs.map(toMealLogResponse);
  }

  async findLogByDate(date: string): Promise<MealLogResponse | null> {
    this.validateDate(date);
    const collection = this.databaseService.getMealLogsCollection();
    const log = await collection.findOne({ date });
    return log ? toMealLogResponse(log) : null;
  }

  async updateMealLog(input: UpdateMealLogInput): Promise<MealLogResponse> {
    this.validateUpdateInput(input);

    const plan = await this.findPlan();
    const dayOfWeek = this.resolveDayOfWeek(input.date, plan);
    this.validateMealOption(plan, dayOfWeek, input.mealType, input.optionId);

    const collection = this.databaseService.getMealLogsCollection();
    const existing = await collection.findOne({ date: input.date });
    const now = new Date();

    let completedMeals = existing?.completedMeals ?? [];

    if (input.completed) {
      const withoutType = completedMeals.filter(
        (meal) => meal.mealType !== input.mealType,
      );
      completedMeals = [
        ...withoutType,
        {
          mealType: input.mealType,
          optionId: input.optionId,
          completedAt: now,
        },
      ];
    } else {
      completedMeals = completedMeals.filter(
        (meal) => meal.mealType !== input.mealType,
      );
    }

    const doc: MealLogDocument = {
      date: input.date,
      dayOfWeek,
      completedMeals,
      updatedAt: now,
    };

    await collection.updateOne(
      { date: input.date },
      { $set: doc },
      { upsert: true },
    );

    return toMealLogResponse(doc);
  }

  private validateDate(date: string): void {
    if (!DATE_REGEX.test(date)) {
      throw new BadRequestException('date deve estar no formato YYYY-MM-DD');
    }

    const parsed = new Date(`${date}T12:00:00`);
    if (Number.isNaN(parsed.getTime())) {
      throw new BadRequestException('date inválida');
    }
  }

  private validateUpdateInput(input: UpdateMealLogInput): void {
    this.validateDate(input.date);

    const validMealTypes: MealType[] = [
      'breakfast',
      'lunch',
      'snack',
      'dinner',
    ];
    if (!validMealTypes.includes(input.mealType)) {
      throw new BadRequestException('mealType inválido');
    }

    if (!input.optionId?.trim()) {
      throw new BadRequestException('optionId é obrigatório');
    }
  }

  private resolveDayOfWeek(date: string, plan: MealPlan): DayOfWeek {
    const jsDay = new Date(`${date}T12:00:00`).getDay();
    const map: Record<number, DayOfWeek | null> = {
      0: null,
      1: 'monday',
      2: 'tuesday',
      3: 'wednesday',
      4: 'thursday',
      5: 'friday',
      6: 'saturday',
    };

    const dayOfWeek = map[jsDay];
    if (!dayOfWeek) {
      throw new BadRequestException(
        'O plano alimentar é de segunda a sábado. Domingo não está incluído.',
      );
    }

    if (!plan.days.some((day) => day.dayOfWeek === dayOfWeek)) {
      throw new BadRequestException(
        `Dia da semana não encontrado no plano: ${DAY_OF_WEEK_LABELS[dayOfWeek]}`,
      );
    }

    return dayOfWeek;
  }

  private validateMealOption(
    plan: MealPlan,
    dayOfWeek: DayOfWeek,
    mealType: MealType,
    optionId: string,
  ): void {
    const day = plan.days.find((entry) => entry.dayOfWeek === dayOfWeek);
    if (!day) {
      throw new BadRequestException('Dia do plano não encontrado');
    }

    const meal = day.meals[mealType];
    if (meal.id !== optionId) {
      throw new BadRequestException(
        'optionId não corresponde à refeição do dia',
      );
    }
  }
}
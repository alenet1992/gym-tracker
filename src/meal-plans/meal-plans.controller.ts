import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import type { UpdateMealLogInput } from '../common/types/meal-plan.types';
import { MealPlansService } from './meal-plans.service';

@Controller('api/meal-plans')
export class MealPlansController {
  constructor(private readonly mealPlansService: MealPlansService) {}

  @Get()
  findPlan() {
    return this.mealPlansService.findPlan();
  }

  @Get('logs')
  findAllLogs() {
    return this.mealPlansService.findAllLogs();
  }

  @Get('logs/:date')
  findLogByDate(@Param('date') date: string) {
    return this.mealPlansService.findLogByDate(date);
  }

  @Put('logs')
  updateMealLog(@Body() body: UpdateMealLogInput) {
    return this.mealPlansService.updateMealLog(body);
  }
}
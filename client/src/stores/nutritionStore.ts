import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import {
  fetchMealLogs,
  fetchMealPlan,
  updateMealLog,
} from '@/api/mealPlans';
import type { DayOfWeek, MealLog, MealPlan, MealType } from '@/types';

const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'snack', 'dinner'];

function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDayOfWeek(date: Date): DayOfWeek | null {
  const map: Record<number, DayOfWeek | null> = {
    0: null,
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
  };
  return map[date.getDay()] ?? null;
}

export const useNutritionStore = defineStore('nutrition', () => {
  const mealPlan = ref<MealPlan | null>(null);
  const mealLogs = ref<MealLog[]>([]);
  const planLoading = ref(false);
  const logsLoading = ref(false);
  const planError = ref<string | null>(null);
  const logsError = ref<string | null>(null);
  const saveError = ref<string | null>(null);
  const selectedDate = ref(formatDateKey(new Date()));

  const logsByDate = computed(() => {
    const map = new Map<string, MealLog>();
    for (const log of mealLogs.value) {
      map.set(log.date, log);
    }
    return map;
  });

  const selectedDayOfWeek = computed(() => {
    const [year, month, day] = selectedDate.value.split('-').map(Number);
    return getDayOfWeek(new Date(year, month - 1, day));
  });

  const selectedDayPlan = computed(() => {
    if (!mealPlan.value || !selectedDayOfWeek.value) return null;
    return (
      mealPlan.value.days.find(
        (day) => day.dayOfWeek === selectedDayOfWeek.value,
      ) ?? null
    );
  });

  const selectedDayLog = computed(
    () => logsByDate.value.get(selectedDate.value) ?? null,
  );

  const completedDaysCount = computed(() => {
    if (!mealPlan.value) return 0;

    return mealLogs.value.filter((log) => {
      const dayPlan = mealPlan.value!.days.find(
        (day) => day.dayOfWeek === log.dayOfWeek,
      );
      if (!dayPlan) return false;
      return MEAL_TYPES.every((mealType) =>
        log.completedMeals.some((meal) => meal.mealType === mealType),
      );
    }).length;
  });

  const loadMealPlan = async () => {
    planLoading.value = true;
    planError.value = null;

    try {
      mealPlan.value = await fetchMealPlan();
    } catch (error) {
      planError.value =
        error instanceof Error
          ? error.message
          : 'Erro ao carregar plano alimentar';
    } finally {
      planLoading.value = false;
    }
  };

  const loadMealLogs = async () => {
    logsLoading.value = true;
    logsError.value = null;

    try {
      mealLogs.value = await fetchMealLogs();
    } catch (error) {
      logsError.value =
        error instanceof Error
          ? error.message
          : 'Erro ao carregar registo alimentar';
    } finally {
      logsLoading.value = false;
    }
  };

  const loadAll = async () => {
    await Promise.all([loadMealPlan(), loadMealLogs()]);
  };

  const isMealCompleted = (date: string, mealType: MealType): boolean => {
    const log = logsByDate.value.get(date);
    return log?.completedMeals.some((meal) => meal.mealType === mealType) ?? false;
  };

  const getDayProgress = (date: string): { completed: number; total: number } => {
    const log = logsByDate.value.get(date);
    const completed = log?.completedMeals.length ?? 0;
    return { completed, total: MEAL_TYPES.length };
  };

  const isDayFullyCompleted = (date: string): boolean => {
    const progress = getDayProgress(date);
    return progress.completed === progress.total;
  };

  const toggleMeal = async (
    date: string,
    mealType: MealType,
    optionId: string,
    completed: boolean,
  ): Promise<boolean> => {
    saveError.value = null;

    try {
      const updated = await updateMealLog({
        date,
        mealType,
        optionId,
        completed,
      });

      const index = mealLogs.value.findIndex((log) => log.date === date);
      if (index >= 0) {
        mealLogs.value[index] = updated;
      } else {
        mealLogs.value.unshift(updated);
      }

      return true;
    } catch (error) {
      saveError.value =
        error instanceof Error ? error.message : 'Erro ao guardar refeição';
      return false;
    }
  };

  const setSelectedDate = (date: string) => {
    selectedDate.value = date;
  };

  const goToToday = () => {
    selectedDate.value = formatDateKey(new Date());
  };

  return {
    mealPlan,
    mealLogs,
    planLoading,
    logsLoading,
    planError,
    logsError,
    saveError,
    selectedDate,
    selectedDayOfWeek,
    selectedDayPlan,
    selectedDayLog,
    completedDaysCount,
    loadAll,
    loadMealPlan,
    loadMealLogs,
    isMealCompleted,
    getDayProgress,
    isDayFullyCompleted,
    toggleMeal,
    setSelectedDate,
    goToToday,
    formatDateKey,
    getDayOfWeek,
  };
});
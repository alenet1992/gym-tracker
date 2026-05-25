import type { WorkoutSession } from '@/types';

const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const WEEKDAY_LABELS_ORDERED = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] as const;

export interface FavoriteItem {
  label: string;
  count: number;
}

export interface WorkoutStats {
  totalWorkouts: number;
  averageDurationSeconds: number;
  favoriteWeekday: FavoriteItem | null;
  favoritePlan: FavoriteItem | null;
  monthlyAverage: number;
  weekdayLabels: readonly string[];
  weekdayCounts: number[];
  planLabels: string[];
  planCounts: number[];
  monthLabels: string[];
  monthCounts: number[];
}

function countMonthsSpan(first: Date, last: Date): number {
  const months =
    (last.getFullYear() - first.getFullYear()) * 12 +
    (last.getMonth() - first.getMonth()) +
    1;
  return Math.max(1, months);
}

function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString('pt-PT', { month: 'short', year: '2-digit' });
}

export function computeWorkoutStats(sessions: WorkoutSession[]): WorkoutStats {
  const empty: WorkoutStats = {
    totalWorkouts: 0,
    averageDurationSeconds: 0,
    favoriteWeekday: null,
    favoritePlan: null,
    monthlyAverage: 0,
    weekdayLabels: WEEKDAY_LABELS_ORDERED,
    weekdayCounts: WEEKDAY_ORDER.map(() => 0),
    planLabels: [],
    planCounts: [],
    monthLabels: [],
    monthCounts: [],
  };

  if (sessions.length === 0) return empty;

  const weekdayRaw = [0, 0, 0, 0, 0, 0, 0];
  const planMap = new Map<string, { label: string; count: number }>();
  const monthMap = new Map<string, number>();

  let totalDuration = 0;
  const dates: Date[] = [];

  for (const session of sessions) {
    const date = new Date(session.date);
    dates.push(date);

    weekdayRaw[date.getDay()] += 1;
    totalDuration += session.duration;

    const existing = planMap.get(session.planId);
    if (existing) {
      existing.count += 1;
    } else {
      planMap.set(session.planId, { label: session.day || session.planName, count: 1 });
    }

    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthMap.set(monthKey, (monthMap.get(monthKey) ?? 0) + 1);
  }

  const weekdayCounts = WEEKDAY_ORDER.map((dayIndex) => weekdayRaw[dayIndex]);

  let favoriteWeekday: FavoriteItem | null = null;
  weekdayCounts.forEach((count, index) => {
    if (!favoriteWeekday || count > favoriteWeekday.count) {
      favoriteWeekday = { label: WEEKDAY_LABELS_ORDERED[index], count };
    }
  });
  if (favoriteWeekday && favoriteWeekday.count === 0) {
    favoriteWeekday = null;
  }

  const planEntries = [...planMap.entries()].sort((a, b) => b[1].count - a[1].count);
  const favoritePlan: FavoriteItem | null = planEntries[0]
    ? { label: planEntries[0][1].label, count: planEntries[0][1].count }
    : null;

  const sortedMonths = [...monthMap.entries()].sort(([a], [b]) => a.localeCompare(b));
  const monthLabels = sortedMonths.map(([key]) => {
    const [year, month] = key.split('-').map(Number);
    return formatMonthLabel(new Date(year, month - 1, 1));
  });
  const monthCounts = sortedMonths.map(([, count]) => count);

  const firstDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const lastDate = new Date(Math.max(...dates.map((d) => d.getTime())));
  const monthSpan = countMonthsSpan(firstDate, lastDate);
  const monthlyAverage =
    Math.round((sessions.length / monthSpan) * 10) / 10;

  return {
    totalWorkouts: sessions.length,
    averageDurationSeconds: Math.round(totalDuration / sessions.length),
    favoriteWeekday,
    favoritePlan,
    monthlyAverage,
    weekdayLabels: WEEKDAY_LABELS_ORDERED,
    weekdayCounts,
    planLabels: planEntries.map(([, v]) => v.label),
    planCounts: planEntries.map(([, v]) => v.count),
    monthLabels,
    monthCounts,
  };
}

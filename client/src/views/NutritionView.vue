<template>
  <div class="nutrition-view">
    <div class="page-header">
      <h1 class="page-title">Plano Alimentar</h1>
      <p class="page-subtitle">
        Definição com volume e proteína — ~150g/dia para preservar músculo
      </p>
    </div>

    <div v-if="planLoading" class="status-card">
      <i class="fas fa-spinner fa-spin"></i>
      <p>A carregar plano alimentar...</p>
    </div>

    <div v-else-if="planError" class="status-card status-card--error">
      <i class="fas fa-exclamation-triangle"></i>
      <p>{{ planError }}</p>
      <button class="btn btn-secondary" @click="retryLoad">Tentar novamente</button>
    </div>

    <template v-else-if="mealPlan">
      <section class="overview-grid">
        <div class="overview-card">
          <span class="overview-label">Perfil</span>
          <strong>{{ mealPlan.profile.heightM }}m · {{ mealPlan.profile.weightKg }}kg</strong>
        </div>
        <div class="overview-card">
          <span class="overview-label">Proteína diária</span>
          <strong>{{ mealPlan.targetProteinG }}g</strong>
        </div>
        <div class="overview-card">
          <span class="overview-label">Dias completos</span>
          <strong>{{ completedDaysCount }}</strong>
        </div>
      </section>

      <section class="guidelines-card">
        <h2><i class="fas fa-lightbulb"></i> Regras do plano</h2>
        <ul>
          <li v-for="(rule, index) in mealPlan.guidelines" :key="index">
            {{ rule }}
          </li>
        </ul>
        <p class="plate-rule">
          <i class="fas fa-utensils"></i>
          {{ mealPlan.plateRule }}
        </p>
      </section>

      <section class="week-section">
        <div class="section-header">
          <h2>Semana (Seg–Sáb)</h2>
          <button class="btn btn-secondary btn-sm" @click="goToToday">
            <i class="fas fa-calendar-day"></i>
            Hoje
          </button>
        </div>

        <div class="week-grid">
          <button
            v-for="day in mealPlan.days"
            :key="day.dayOfWeek"
            class="week-day"
            :class="{
              'week-day--active': selectedDayOfWeek === day.dayOfWeek,
              'week-day--complete': isDayCompleteForWeekday(day.dayOfWeek),
            }"
            @click="selectWeekday(day.dayOfWeek)"
          >
            <span class="week-day-label">{{ shortDayLabel(day.label) }}</span>
            <span class="week-day-progress">
              {{ getWeekdayProgress(day.dayOfWeek).completed }}/{{ getWeekdayProgress(day.dayOfWeek).total }}
            </span>
          </button>
        </div>
      </section>

      <section v-if="selectedDayPlan" class="day-detail">
        <div class="day-detail-header">
          <div>
            <h2>{{ selectedDayPlan.label }}</h2>
            <p class="day-date">{{ formatSelectedDate }}</p>
          </div>
          <div
            class="day-badge"
            :class="{ 'day-badge--complete': isSelectedDayComplete }"
          >
            <i :class="isSelectedDayComplete ? 'fas fa-check-circle' : 'fas fa-circle'"></i>
            {{ isSelectedDayComplete ? 'Dia completo' : `${selectedDayProgress.completed}/4 refeições` }}
          </div>
        </div>

        <p v-if="saveError" class="save-error">{{ saveError }}</p>

        <div class="meals-list">
          <article
            v-for="mealEntry in mealEntries"
            :key="mealEntry.type"
            class="meal-card"
            :class="{ 'meal-card--done': isMealCompleted(selectedDate, mealEntry.type) }"
          >
            <label class="meal-check">
              <input
                type="checkbox"
                :checked="isMealCompleted(selectedDate, mealEntry.type)"
                :disabled="savingMeal === mealEntry.type"
                @change="onMealToggle(mealEntry.type, mealEntry.option)"
              />
              <span class="meal-check-box">
                <i class="fas fa-check"></i>
              </span>
            </label>

            <div class="meal-content">
              <div class="meal-header">
                <span class="meal-type">{{ mealEntry.label }}</span>
                <h3>{{ mealEntry.option.name }}</h3>
              </div>
              <p class="meal-description">{{ mealEntry.option.description }}</p>
              <ul class="meal-items">
                <li v-for="(item, index) in mealEntry.option.items" :key="index">
                  {{ item }}
                </li>
              </ul>
              <p v-if="mealEntry.option.tips" class="meal-tips">
                <i class="fas fa-info-circle"></i>
                {{ mealEntry.option.tips }}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section v-else class="status-card">
        <i class="fas fa-calendar-times"></i>
        <p>O plano alimentar é de segunda a sábado. Seleciona um dia da semana.</p>
      </section>

      <section v-if="recentCompletedDays.length > 0" class="history-section">
        <h2><i class="fas fa-history"></i> Dias em que seguiste o plano</h2>
        <div class="history-list">
          <div
            v-for="log in recentCompletedDays"
            :key="log.date"
            class="history-item"
          >
            <div>
              <strong>{{ formatLogDayLabel(log) }}</strong>
              <span>{{ formatLogDate(log.date) }}</span>
            </div>
            <span class="history-badge">
              <i class="fas fa-check"></i>
              4/4
            </span>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useNutritionStore } from '@/stores/nutritionStore';
import type { DayOfWeek, MealOption, MealType } from '@/types';

const nutritionStore = useNutritionStore();
const savingMeal = ref<MealType | null>(null);

const mealPlan = computed(() => nutritionStore.mealPlan);
const planLoading = computed(() => nutritionStore.planLoading);
const planError = computed(() => nutritionStore.planError);
const saveError = computed(() => nutritionStore.saveError);
const selectedDate = computed(() => nutritionStore.selectedDate);
const selectedDayOfWeek = computed(() => nutritionStore.selectedDayOfWeek);
const selectedDayPlan = computed(() => nutritionStore.selectedDayPlan);
const completedDaysCount = computed(() => nutritionStore.completedDaysCount);

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: 'Pequeno-almoço',
  lunch: 'Almoço',
  snack: 'Lanche',
  dinner: 'Jantar',
};

const mealEntries = computed(() => {
  if (!selectedDayPlan.value) return [];

  const meals = selectedDayPlan.value.meals;
  return (Object.keys(MEAL_LABELS) as MealType[]).map((type) => ({
    type,
    label: MEAL_LABELS[type],
    option: meals[type] as MealOption,
  }));
});

const selectedDayProgress = computed(() =>
  nutritionStore.getDayProgress(selectedDate.value),
);

const isSelectedDayComplete = computed(() =>
  nutritionStore.isDayFullyCompleted(selectedDate.value),
);

const formatSelectedDate = computed(() => {
  const [year, month, day] = selectedDate.value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('pt-PT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
});

const recentCompletedDays = computed(() =>
  nutritionStore.mealLogs
    .filter((log) => nutritionStore.isDayFullyCompleted(log.date))
    .slice(0, 10),
);

const shortDayLabel = (label: string): string => label.split('-')[0].trim();

const isMealCompleted = (date: string, mealType: MealType): boolean =>
  nutritionStore.isMealCompleted(date, mealType);

const getWeekdayProgress = (dayOfWeek: DayOfWeek) => {
  const date = getDateForWeekday(dayOfWeek);
  return nutritionStore.getDayProgress(date);
};

const isDayCompleteForWeekday = (dayOfWeek: DayOfWeek): boolean => {
  const date = getDateForWeekday(dayOfWeek);
  return nutritionStore.isDayFullyCompleted(date);
};

const getDateForWeekday = (dayOfWeek: DayOfWeek): string => {
  const today = new Date();
  const todayDow = nutritionStore.getDayOfWeek(today);
  const targetIndex = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(dayOfWeek);
  const currentIndex = todayDow
    ? ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(todayDow)
    : -1;

  const date = new Date(today);
  if (currentIndex >= 0) {
    date.setDate(today.getDate() + (targetIndex - currentIndex));
  }
  return nutritionStore.formatDateKey(date);
};

const selectWeekday = (dayOfWeek: DayOfWeek) => {
  nutritionStore.setSelectedDate(getDateForWeekday(dayOfWeek));
};

const goToToday = () => {
  nutritionStore.goToToday();
};

const onMealToggle = async (mealType: MealType, option: MealOption) => {
  const currentlyCompleted = isMealCompleted(selectedDate.value, mealType);
  savingMeal.value = mealType;

  await nutritionStore.toggleMeal(
    selectedDate.value,
    mealType,
    option.id,
    !currentlyCompleted,
  );

  savingMeal.value = null;
};

const formatLogDate = (date: string): string => {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const formatLogDayLabel = (log: { dayOfWeek: DayOfWeek }): string => {
  const labels: Record<DayOfWeek, string> = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
  };
  return labels[log.dayOfWeek];
};

const retryLoad = () => {
  nutritionStore.loadAll();
};

onMounted(() => {
  nutritionStore.loadAll();
});
</script>

<style scoped>
.nutrition-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  color: #111;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #666;
  margin: 0;
}

.status-card {
  text-align: center;
  padding: 3rem 1rem;
  border: 2px solid #111;
  border-radius: 1rem;
  color: #666;
}

.status-card i {
  font-size: 2rem;
  margin-bottom: 1rem;
  display: block;
}

.status-card--error {
  color: #b00020;
  border-color: #b00020;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.overview-card {
  border: 2px solid #111;
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.overview-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #666;
  font-weight: 600;
}

.overview-card strong {
  font-size: 1.25rem;
}

.guidelines-card {
  border: 2px solid #111;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.guidelines-card h2 {
  font-size: 1.125rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.guidelines-card ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}

.guidelines-card li {
  padding: 0.5rem 0;
  padding-left: 1.25rem;
  position: relative;
  color: #444;
  line-height: 1.5;
}

.guidelines-card li::before {
  content: '•';
  position: absolute;
  left: 0;
  font-weight: 700;
}

.plate-rule {
  margin: 0;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.5;
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.week-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h2 {
  font-size: 1.25rem;
  margin: 0;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.week-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
}

.week-day {
  border: 2px solid #111;
  border-radius: 0.75rem;
  padding: 0.75rem 0.5rem;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-family: inherit;
}

.week-day:hover {
  background: #f5f5f5;
}

.week-day--active {
  background: #111;
  color: #fff;
}

.week-day--complete:not(.week-day--active) {
  border-color: #2e7d32;
}

.week-day-label {
  font-size: 0.8rem;
  font-weight: 600;
}

.week-day-progress {
  font-size: 0.7rem;
  opacity: 0.8;
}

.day-detail {
  margin-bottom: 2rem;
}

.day-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.day-detail-header h2 {
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
}

.day-date {
  margin: 0;
  color: #666;
  text-transform: capitalize;
}

.day-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid #111;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}

.day-badge--complete {
  background: #111;
  color: #fff;
}

.save-error {
  color: #b00020;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.meals-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.meal-card {
  display: flex;
  gap: 1rem;
  border: 2px solid #111;
  border-radius: 1rem;
  padding: 1.25rem;
  transition: all 0.2s;
}

.meal-card--done {
  background: #f8f8f8;
  border-color: #2e7d32;
}

.meal-check {
  flex-shrink: 0;
  cursor: pointer;
}

.meal-check input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.meal-check-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 2px solid #111;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.meal-check-box i {
  opacity: 0;
  font-size: 0.875rem;
  transition: opacity 0.2s;
}

.meal-check input:checked + .meal-check-box {
  background: #111;
  color: #fff;
}

.meal-check input:checked + .meal-check-box i {
  opacity: 1;
}

.meal-content {
  flex: 1;
  min-width: 0;
}

.meal-header {
  margin-bottom: 0.5rem;
}

.meal-type {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #666;
  font-weight: 700;
}

.meal-header h3 {
  margin: 0.15rem 0 0;
  font-size: 1.1rem;
}

.meal-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.meal-items {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.9rem;
  line-height: 1.6;
}

.meal-tips {
  margin: 0.75rem 0 0;
  font-size: 0.85rem;
  color: #555;
  display: flex;
  gap: 0.4rem;
  align-items: flex-start;
}

.history-section h2 {
  font-size: 1.125rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border: 2px solid #111;
  border-radius: 0.75rem;
}

.history-item div {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.history-item span {
  font-size: 0.85rem;
  color: #666;
}

.history-badge {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 600;
  font-size: 0.85rem;
  color: #2e7d32;
}

@media (max-width: 768px) {
  .nutrition-view {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .week-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .day-detail-header {
    flex-direction: column;
  }

  .meal-card {
    padding: 1rem;
  }
}
</style>
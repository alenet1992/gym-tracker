<template>
  <div class="stats-view">
    <div class="page-header">
      <h1 class="page-title">Estatísticas de Treino</h1>
      <p class="page-subtitle">Análise do teu histórico de treinos</p>
    </div>

    <div v-if="historyLoading" class="empty-state">
      <i class="fas fa-spinner fa-spin"></i>
      <h3>A carregar dados...</h3>
    </div>

    <div v-else-if="historyError" class="empty-state">
      <i class="fas fa-exclamation-triangle"></i>
      <h3>Erro ao carregar histórico</h3>
      <p>{{ historyError }}</p>
      <button class="btn btn-primary" @click="retryLoad">
        <i class="fas fa-redo"></i>
        Tentar novamente
      </button>
    </div>

    <div v-else-if="stats.totalWorkouts === 0" class="empty-state">
      <i class="fas fa-chart-bar"></i>
      <h3>Sem dados ainda</h3>
      <p>Finaliza o teu primeiro treino para ver estatísticas aqui.</p>
      <router-link to="/plans" class="btn btn-primary">
        <i class="fas fa-play"></i>
        Ver planos
      </router-link>
    </div>

    <div v-else class="stats-content">
      <div class="summary-grid">
        <div class="summary-card">
          <i class="fas fa-hashtag"></i>
          <div>
            <h3>{{ stats.totalWorkouts }}</h3>
            <p>Treinos realizados</p>
          </div>
        </div>

        <div class="summary-card">
          <i class="fas fa-clock"></i>
          <div>
            <h3>{{ formatDuration(stats.averageDurationSeconds) }}</h3>
            <p>Tempo médio por treino</p>
          </div>
        </div>

        <div class="summary-card">
          <i class="fas fa-calendar-week"></i>
          <div>
            <h3>{{ stats.favoriteWeekday?.label ?? '—' }}</h3>
            <p>Dia da semana favorito</p>
            <span v-if="stats.favoriteWeekday" class="summary-detail">
              {{ stats.favoriteWeekday.count }} treino{{ stats.favoriteWeekday.count === 1 ? '' : 's' }}
            </span>
          </div>
        </div>

        <div class="summary-card">
          <i class="fas fa-dumbbell"></i>
          <div>
            <h3>{{ stats.favoritePlan?.label ?? '—' }}</h3>
            <p>Plano mais frequente</p>
            <span v-if="stats.favoritePlan" class="summary-detail">
              {{ stats.favoritePlan.count }} vez{{ stats.favoritePlan.count === 1 ? '' : 'es' }}
            </span>
          </div>
        </div>

        <div class="summary-card summary-card--wide">
          <i class="fas fa-calendar-alt"></i>
          <div>
            <h3>{{ stats.monthlyAverage }}</h3>
            <p>Média mensal de treinos</p>
          </div>
        </div>
      </div>

      <div class="charts-grid">
        <section class="chart-card">
          <h2 class="chart-title">Treinos por dia da semana</h2>
          <div class="chart-container">
            <Bar :data="weekdayChartData" :options="barChartOptions" />
          </div>
        </section>

        <section class="chart-card">
          <h2 class="chart-title">Plano de treino mais usado</h2>
          <div class="chart-container chart-container--doughnut">
            <Doughnut
              v-if="stats.planLabels.length > 0"
              :data="planChartData"
              :options="doughnutChartOptions"
            />
          </div>
        </section>

        <section class="chart-card chart-card--wide">
          <h2 class="chart-title">Treinos por mês</h2>
          <div class="chart-container">
            <Bar
              v-if="stats.monthLabels.length > 0"
              :data="monthChartData"
              :options="monthBarOptions"
            />
            <p v-else class="chart-empty">Dados mensais aparecem após o primeiro treino.</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'vue-chartjs';
import { useWorkoutStore } from '@/stores/workoutStore';
import { computeWorkoutStats } from '@/utils/workoutStats';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
);

const workoutStore = useWorkoutStore();

const historyLoading = computed(() => workoutStore.historyLoading);
const historyError = computed(() => workoutStore.historyError);

const stats = computed(() =>
  computeWorkoutStats(workoutStore.workoutHistory),
);

const chartColors = {
  fill: 'rgba(17, 17, 17, 0.85)',
  border: '#111111',
  palette: ['#111111', '#444444', '#666666', '#888888', '#aaaaaa'],
};

const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
};

const barChartOptions = {
  ...baseChartOptions,
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#111', font: { weight: 500 as const } },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#666',
        stepSize: 1,
        precision: 0,
      },
      grid: { color: '#eee' },
    },
  },
};

const monthBarOptions = {
  ...barChartOptions,
  scales: {
    ...barChartOptions.scales,
    x: {
      ...barChartOptions.scales?.x,
      ticks: { color: '#111', maxRotation: 45, minRotation: 0 },
    },
  },
};

const doughnutChartOptions = {
  ...baseChartOptions,
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: { color: '#111', boxWidth: 12, padding: 16 },
    },
  },
};

const weekdayChartData = computed(() => ({
  labels: [...stats.value.weekdayLabels],
  datasets: [
    {
      label: 'Treinos',
      data: stats.value.weekdayCounts,
      backgroundColor: chartColors.fill,
      borderColor: chartColors.border,
      borderWidth: 2,
      borderRadius: 6,
    },
  ],
}));

const planChartData = computed(() => ({
  labels: stats.value.planLabels,
  datasets: [
    {
      data: stats.value.planCounts,
      backgroundColor: chartColors.palette,
      borderColor: '#fff',
      borderWidth: 2,
    },
  ],
}));

const monthChartData = computed(() => ({
  labels: stats.value.monthLabels,
  datasets: [
    {
      label: 'Treinos',
      data: stats.value.monthCounts,
      backgroundColor: chartColors.fill,
      borderColor: chartColors.border,
      borderWidth: 2,
      borderRadius: 6,
    },
  ],
}));

onMounted(() => {
  workoutStore.loadWorkoutHistory();
});

const retryLoad = () => {
  workoutStore.loadWorkoutHistory();
};

const formatDuration = (seconds: number): string => {
  return workoutStore.formatDuration(seconds);
};
</script>

<style scoped>
.stats-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  color: #111;
}

.page-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.125rem;
  color: #666;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.empty-state i {
  font-size: 4rem;
  color: #111;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #111;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.summary-card {
  background: #fff;
  border: 2px solid #111;
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: transform 0.2s;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.summary-card--wide {
  grid-column: 1 / -1;
}

.summary-card i {
  font-size: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
  color: #fff;
  border-radius: 50%;
  flex-shrink: 0;
}

.summary-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #111;
  line-height: 1.2;
}

.summary-card p {
  margin: 0;
  color: #666;
  font-size: 0.875rem;
  font-weight: 500;
}

.summary-detail {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.8rem;
  color: #888;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.chart-card {
  background: #fff;
  border: 2px solid #111;
  border-radius: 1rem;
  padding: 1.5rem;
}

.chart-card--wide {
  grid-column: 1 / -1;
}

.chart-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1.25rem 0;
  color: #111;
}

.chart-container {
  height: 280px;
  position: relative;
}

.chart-container--doughnut {
  height: 320px;
}

.chart-empty {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 2px solid #111;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  background: #111;
  color: #fff;
}

.btn:hover {
  background: #fff;
  color: #111;
}

@media (max-width: 900px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .chart-card--wide {
    grid-column: auto;
  }
}

@media (max-width: 768px) {
  .stats-view {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .summary-card--wide {
    grid-column: auto;
  }
}
</style>

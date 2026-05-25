import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { WorkoutPlan, WorkoutSession, ActiveWorkout, Exercise } from '@/types';
import { fetchWorkoutPlans } from '@/api/workoutPlans';
import {
  createWorkoutSession,
  fetchWorkoutSessions,
} from '@/api/workoutSessions';

export const useWorkoutStore = defineStore('workout', () => {
  // State
  const plans = ref<WorkoutPlan[]>([]);
  const plansLoading = ref(false);
  const plansError = ref<string | null>(null);
  const activeWorkout = ref<ActiveWorkout | null>(null);
  const workoutHistory = ref<WorkoutSession[]>([]);
  const historyLoading = ref(false);
  const historyError = ref<string | null>(null);
  const finishError = ref<string | null>(null);
  const selectedExercise = ref<Exercise | null>(null);
  const isExerciseModalVisible = ref(false);

  // Getters
  const isWorkoutActive = computed(() => activeWorkout.value !== null);
  const currentPlan = computed(() => activeWorkout.value?.plan || null);
  const workoutDuration = computed(() => {
    if (!activeWorkout.value) return 0;
    return Math.floor((Date.now() - activeWorkout.value.startTime) / 1000);
  });

  // Actions
  const startWorkout = (plan: WorkoutPlan) => {
    activeWorkout.value = {
      plan,
      startTime: Date.now(),
      completedExercises: new Set(),
    };
  };

  const completeExercise = (exerciseName: string) => {
    if (activeWorkout.value) {
      activeWorkout.value.completedExercises.add(exerciseName);
    }
  };

  const isExerciseCompleted = (exerciseName: string): boolean => {
    return activeWorkout.value?.completedExercises.has(exerciseName) || false;
  };

  const finishWorkout = async (): Promise<boolean> => {
    if (!activeWorkout.value) return false;

    finishError.value = null;
    const workout = activeWorkout.value;
    const durationSeconds = Math.floor(
      (Date.now() - workout.startTime) / 1000,
    );

    try {
      const session = await createWorkoutSession({
        planId: workout.plan.id,
        planName: workout.plan.name,
        startedAt: new Date(workout.startTime).toISOString(),
        durationSeconds,
        completedExercises: Array.from(workout.completedExercises),
      });

      workoutHistory.value.unshift(session);
      activeWorkout.value = null;
      return true;
    } catch (error) {
      finishError.value =
        error instanceof Error ? error.message : 'Erro ao guardar treino';
      console.error(finishError.value);
      return false;
    }
  };

  const cancelWorkout = () => {
    activeWorkout.value = null;
  };

  const showExerciseDetail = (exercise: Exercise) => {
    selectedExercise.value = exercise;
    isExerciseModalVisible.value = true;
  };

  const hideExerciseDetail = () => {
    selectedExercise.value = null;
    isExerciseModalVisible.value = false;
  };

  const loadWorkoutHistory = async () => {
    historyLoading.value = true;
    historyError.value = null;

    try {
      workoutHistory.value = await fetchWorkoutSessions();
    } catch (error) {
      historyError.value =
        error instanceof Error ? error.message : 'Erro ao carregar histórico';
      console.error(historyError.value);
    } finally {
      historyLoading.value = false;
    }
  };

  const loadPlans = async () => {
    plansLoading.value = true;
    plansError.value = null;

    try {
      plans.value = await fetchWorkoutPlans();
    } catch (error) {
      plansError.value =
        error instanceof Error ? error.message : 'Erro ao carregar planos';
      console.error(plansError.value);
    } finally {
      plansLoading.value = false;
    }
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  return {
    // State
    plans,
    plansLoading,
    plansError,
    activeWorkout,
    workoutHistory,
    historyLoading,
    historyError,
    finishError,
    selectedExercise,
    isExerciseModalVisible,
    // Getters
    isWorkoutActive,
    currentPlan,
    workoutDuration,
    // Actions
    startWorkout,
    completeExercise,
    isExerciseCompleted,
    finishWorkout,
    cancelWorkout,
    showExerciseDetail,
    hideExerciseDetail,
    loadPlans,
    loadWorkoutHistory,
    formatDuration,
  };
});

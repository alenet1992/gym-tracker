import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { WorkoutPlan, WorkoutSession, ActiveWorkout, Exercise } from '@/types';
import { workoutPlans } from '@/data/workoutPlans';

export const useWorkoutStore = defineStore('workout', () => {
  // State
  const plans = ref<WorkoutPlan[]>(workoutPlans);
  const activeWorkout = ref<ActiveWorkout | null>(null);
  const workoutHistory = ref<WorkoutSession[]>([]);
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
      completedExercises: new Set()
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

  const finishWorkout = () => {
    if (activeWorkout.value) {
      const session: WorkoutSession = {
        planId: activeWorkout.value.plan.id,
        planName: activeWorkout.value.plan.name,
        date: new Date().toISOString(),
        duration: Math.floor((Date.now() - activeWorkout.value.startTime) / 1000),
        completedExercises: Array.from(activeWorkout.value.completedExercises)
      };
      
      workoutHistory.value.unshift(session);
      saveHistoryToStorage();
      activeWorkout.value = null;
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

  const saveHistoryToStorage = () => {
    localStorage.setItem('workout-history', JSON.stringify(workoutHistory.value));
  };

  const loadHistoryFromStorage = () => {
    const stored = localStorage.getItem('workout-history');
    if (stored) {
      try {
        workoutHistory.value = JSON.parse(stored);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      }
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

  // Initialize
  loadHistoryFromStorage();

  return {
    // State
    plans,
    activeWorkout,
    workoutHistory,
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
    formatDuration
  };
});
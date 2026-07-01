<template>
  <div id="app">
    <header class="app-header">
      <div class="container header-content">
        <router-link to="/plans" class="logo">
          <i class="fas fa-dumbbell"></i>
          <h1>GymTracker</h1>
        </router-link>
        <nav class="desktop-nav">
          <router-link to="/plans" class="nav-link">Planos</router-link>
          <router-link to="/nutrition" class="nav-link">Alimentação</router-link>
          <router-link to="/history" class="nav-link">Histórico</router-link>
          <router-link to="/stats" class="nav-link">Estatísticas</router-link>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page-transition" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <nav class="bottom-nav" aria-label="Navegação principal">
      <router-link to="/plans" class="nav-item">
        <i class="fas fa-list-ul"></i>
        <span>Planos</span>
      </router-link>

      <router-link to="/nutrition" class="nav-item">
        <i class="fas fa-utensils"></i>
        <span>Alimentação</span>
      </router-link>

      <router-link
        v-if="isWorkoutActive"
        :to="activeWorkoutTo"
        class="nav-item nav-item--executing"
      >
        <span class="nav-pulse" aria-hidden="true"></span>
        <i class="fas fa-play-circle"></i>
        <span>A executar</span>
      </router-link>

      <router-link to="/stats" class="nav-item">
        <i class="fas fa-chart-bar"></i>
        <span>Stats</span>
      </router-link>
    </nav>

    <ExerciseModal />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWorkoutStore } from '@/stores/workoutStore';
import ExerciseModal from '@/components/ExerciseModal.vue';

const workoutStore = useWorkoutStore();

const isWorkoutActive = computed(() => workoutStore.isWorkoutActive);
const activeWorkoutTo = computed(() => {
  const planId = workoutStore.currentPlan?.id;
  return planId ? `/workout/${planId}` : '/plans';
});


// Prevent page reload during active workout
window.addEventListener('beforeunload', (e) => {
  if (workoutStore.isWorkoutActive) {
    e.preventDefault();
    e.returnValue = 'You have an active workout. Are you sure you want to leave?';
  }
});
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  color: #111;
}

.app-header {
  background: #fff;
  border-bottom: 2px solid #111;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
}

.logo i {
  font-size: 1.5rem;
  color: #111;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.desktop-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #111;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.nav-link:hover {
  border-color: #111;
  color: #111;
}

.nav-link.router-link-active {
  background: #111;
  color: #fff;
  border-color: #111;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

.bottom-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 2px solid #111;
  padding: 0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom, 0px));
  justify-content: space-around;
  align-items: stretch;
  z-index: 1000;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.06);
}

.nav-item {
  position: relative;
  flex: 1;
  max-width: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  color: #666;
  text-decoration: none;
  font-size: 0.7rem;
  font-weight: 600;
  border: 2px solid transparent;
}

.nav-item--executing {
  color: #111;
}

.nav-pulse {
  position: absolute;
  top: 0.35rem;
  right: calc(50% - 1.35rem);
  width: 0.5rem;
  height: 0.5rem;
  background: #111;
  border-radius: 50%;
  animation: nav-pulse 1.5s ease-in-out infinite;
}

@keyframes nav-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.25);
  }
}

.nav-item:hover {
  color: #111;
  border-color: #111;
}

.nav-item.router-link-active {
  color: #fff;
  background: #111;
  border-color: #111;
}

.nav-item i {
  font-size: 1.25rem;
}

.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.3s ease;
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .app-header h1 {
    font-size: 1.125rem;
  }

  .main-content {
    padding-bottom: calc(5.5rem + env(safe-area-inset-bottom, 0px));
  }

  .bottom-nav {
    display: flex;
  }
}

@media (min-width: 769px) {
  .bottom-nav {
    display: none;
  }

  .desktop-nav {
    display: flex;
  }
}
</style>
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Workout Plans' }
  },
  {
    path: '/plans',
    name: 'Plans',
    component: () => import('@/views/PlansView.vue'),
    meta: { title: 'Workout Plans' }
  },
  {
    path: '/plan/:id',
    name: 'PlanDetail',
    component: () => import('@/views/PlanDetailView.vue'),
    meta: { title: 'Plan Details' },
    props: true
  },
  {
    path: '/workout/:id',
    name: 'ActiveWorkout',
    component: () => import('@/views/ActiveWorkoutView.vue'),
    meta: { title: 'Active Workout' },
    props: true
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/HistoryView.vue'),
    meta: { title: 'History' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to: RouteLocationNormalized, from: RouteLocationNormalized, savedPosition: any) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  document.title = `${to.meta.title || 'Gym App'} | Fitness App`;
  next();
});

export default router;
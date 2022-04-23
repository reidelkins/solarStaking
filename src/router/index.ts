import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SpaceShip from '@/views/SpaceShip.vue';
import Manager from '@/views/Manager.vue';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Spaceship',
    name: 'SpaceShip',
    component: SpaceShip,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

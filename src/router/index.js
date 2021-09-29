import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Manage from '@/views/Manage.vue';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/manage-music',
    name: 'Manage',
    component: Manage,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Gurad');
      next();
    },
  },
  {
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'Home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  // Check if user visited path is 'requiresAuth', if not then just let them go.
  if (!to.matched.some(((record) => record.meta.requiresAuth))) {
    next();
    return;
  }

  // check if user is logged or not, after knowing the path they currently visit is 'requiresAuth'
  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: 'Home' });
  }
});

export default router;

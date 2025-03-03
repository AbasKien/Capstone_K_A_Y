import { createRouter, createWebHistory } from 'vue-router';
import loginview from '../views/loginview.vue';
import home from '../views/home.vue';
import admin from '../views/admin.vue';
import addaccount from '../views/addaccount.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: loginview,
  }, 
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: { requiresRole: ['Lead architect', 'Secretary', 'Book keeper', 'Liaison', 'Apprentice'] },
  },
  {
    path: '/admin/dashboard',
    name: 'admin',
    component: admin,
    meta: { requiresRole: ['admin'] },
  },
  {
    path: '/admin/add-account',
    name: 'addaccount',
    component: addaccount,
  }, 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');
  const isLoggedIn = token && userRole;

  // Public routes that don't require authentication
  const publicRoutes = ['login', 'signup'];

  // If route is public, allow access
  if (publicRoutes.includes(to.name)) {
    // If user is logged in and trying to access login/signup, redirect to appropriate dashboard
    if (isLoggedIn && (to.name === 'login' || to.name === 'signup')) {
      return next(userRole === 'admin' ? '/admin/dashboard' : '/home');
    }
    return next();
  }

  // For protected routes, check if user is logged in
  if (!isLoggedIn) {
    return next('/');
  }

  // For role-protected routes, verify role
  if (to.meta.requiresRole) {
    // If role doesn't match, redirect to appropriate dashboard
    if (!to.meta.requiresRole.includes(userRole)) {
      return next(userRole === 'admin' ? '/admin/dashboard' : '/home');
    }
  }

  // If all checks pass, proceed
  next();
});

export default router;

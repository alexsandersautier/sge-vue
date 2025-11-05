import { useAuth } from '@/composables/useAuth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/LoginLayout.vue'),
      meta: {
        requiresAuth: false,
      },
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../pages/LoginPage.vue'),
        }, {
          path: '/register',
          name: 'register',
          component: () => import('../pages/RegisterPage.vue'),
        }
      ]
    }, {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../pages/HomePage.vue'),
        }, {
          path: '/category',
          name: 'category',
          component: () => import('../pages/CategoryPage.vue'),
        }, {
          path: '/category/:id?',
          name: 'new-category',
          component: () => import('../pages/CategoryFormPage.vue'),
        }, {
          path: '/product',
          name: 'product',
          component: () => import('../pages/ProductPage.vue'),
        }, {
          path: '/product/:id?',
          name: 'new-product',
          component: () => import('../pages/ProductFormPage.vue'),
        }
      ]
    }
  ],
})

const auth = useAuth()

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && auth.isTokenExpire()) {
    next({ name: 'login' })
  } else if (!requiresAuth && !auth.isTokenExpire() && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router

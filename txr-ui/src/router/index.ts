import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView
    },
    {
      path: '/application',
      name: 'application',
      component: () => import("@/views/Application.vue")
    },
    {
      path: '/sequence',
      name: 'sequence',
      component: () => import("@/views/Sequence.vue")
    }
  ]
})

export default router

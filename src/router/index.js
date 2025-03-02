import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/HomePage.vue'),
  },
  {
    path: '/cources',
    name: 'cources',
    component: () => import('@/views/cources/CourcesPage.vue'),
  },
  {
    path: '/question',
    name: 'question',
    component: () => import('@/views/question/QuestionPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404/NotFind.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 在路由配置中添加
router.beforeEach((to, from) => {
  console.log('从:', from.path, '导航至:', to.path)
})

export default router

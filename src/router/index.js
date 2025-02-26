import { createRouter, createWebHistory } from 'vue-router'

const routes = []

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 在路由配置中添加
router.beforeEach((to, from) => {
  console.log('从:', from.path, '导航至:', to.path)
})

export default router

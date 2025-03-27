import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/index.js'
import pinia from '@/stores/index.js'
const userStore = useUserStore(pinia)

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
    path: '/knowledgeDetail',
    name: 'knowledgeDetail',
    component: () => import('@/views/knowledge/KnowledgeDetail.vue'),
  },
  {
    path: '/study',
    name: 'study',
    component: () => import('@/views/study/StudyPage..vue'),
  },
  {
    path: '/question',
    name: 'question',
    component: () => import('@/views/question/QuestionPage.vue'),
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('@/views/result/ResultPage.vue'),
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my/myPage.vue'),
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
  if (to.path === '/cources' && !userStore.isCeshi) {
    ElMessage.warning('还未测试，请先去测试！')
    return false
  }
})

export default router

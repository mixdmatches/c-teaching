import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getUserInfo } from '@/api/user'
const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: '首页', show: 'header' },
    component: () => import('@/views/home/HomePage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/cources',
    name: 'cources',
    meta: { title: '课程', show: 'header' },
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
    path: '/exercise',
    name: 'exercise',
    component: () => import('@/views/exercise/ExercisePage.vue'),
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('@/views/result/ResultPage.vue'),
  },
  {
    path: '/my',
    name: 'my',
    meta: { title: '我的', show: 'dropdown', icon: 'User' },
    component: () => import('@/views/my/MyPage.vue'),
  },
  {
    path: '/notes',
    name: 'notes',
    meta: { title: '笔记本', show: 'dropdown', icon: 'Notebook' },
    component: () => import('@/views/notes/index.vue'),
  },
  {
    path: '/errorquestion',
    name: 'errorquestion',
    meta: { title: '错题本', show: 'header' },
    component: () => import('@/views/errorquestion/index.vue'),
  },
  {
    path: '/samequestion',
    name: 'samequestion',
    component: () => import('@/views/sametypeResult/ResultPage.vue'),
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

// 修改路由导航守卫
router.beforeEach(async (to, _from) => {
  const path = ['/cources', '/errorquestion', '/notes']
  const token = localStorage.getItem('token') // 获取 token

  // 检查是否需要登录权限的页面，且没有 token
  const requiresAuth = !['/login', '/404'].includes(to.path)
  if (requiresAuth && !token) {
    ElMessage.warning('请先登录！')
    return '/login' // 跳转到登录页
  }

  // 如果有 token，验证 token 是否有效
  if (requiresAuth && token) {
    try {
      await getUserInfo() // 调用获取用户信息接口
    } catch (_error) {
      // 接口调用失败，token 可能失效
      ElMessage.warning('登录状态已失效，请重新登录！')
      localStorage.removeItem('token') // 移除失效的 token
      return '/login' // 跳转到登录页
    }
  }

  if (path.includes(to.path) && !Number(localStorage.getItem('authority'))) {
    ElMessage.warning('还未测试，请先去测试！')
  }
})

export const to404 = () => {
  router.push('/404')
}

export default router

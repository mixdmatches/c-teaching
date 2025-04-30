import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

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
    component: () => import('@/views/my/myPage.vue'),
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

// 在路由配置中添加
router.beforeEach((to, _from) => {
  const path = ['/cources', '/errorquestion', '/notes']
  if (path.includes(to.path) && !Number(localStorage.getItem('authority'))) {
    ElMessage.warning('还未测试，请先去测试！')
    return false
  }
  if (to.path !== '/login' && !localStorage.getItem('token')) {
    ElMessage.warning('请先登录！')
    router.push('/login')
    return false
  }
  return true
})

export const to404 = () => {
  router.push('/404')
}

export default router

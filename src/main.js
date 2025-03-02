import { createApp } from 'vue'
import '@/styles/index.scss'
import App from './App.vue'
import pinia from '@/stores/index'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 图标引入
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 注册全局组件
import HeaderCm from '@/components/HeaderCm.vue'
// 获取当前环境变量
const baseURL = import.meta.env.VITE_API_BASE
const isMock = import.meta.env.VITE_MOCK_ENABLED === 'true'
console.log('当前环境变量：', baseURL, isMock)
const app = createApp(App)

app.component('HeaderCm', HeaderCm)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')

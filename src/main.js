import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import pinia from '@/stores/index'
import router from './router'
// 获取当前环境变量
const baseURL = import.meta.env.VITE_API_BASE
const isMock = import.meta.env.VITE_MOCK_ENABLED === 'true'
console.log('当前环境变量：', baseURL, isMock)
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

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
// 引入element中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//引入视频播放组件
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
const app = createApp(App)

app.component('HeaderCm', HeaderCm)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(pinia)
app.use(router)
app.mount('#app')
app.use(VueVideoPlayer)

import axios from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: 'http://127.0.0.1:3007',
  timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 添加 token 等逻辑
  return config
})

// 响应拦截器
service.interceptors.response.use(
  response => response.data,
  error => {
    console.error('请求错误:', error)
    if (error.response) {
      // 处理错误响应
      ElMessage.error(error.response.data.message || '请求失败')
    } else {
      ElMessage.error('网络错误')
    }
    return Promise.reject(error)
  }
)

export default service

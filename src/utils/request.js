import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
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
    return Promise.reject(error)
  }
)

export default service

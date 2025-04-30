import axios from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: 'http://47.122.30.214:8101',
  timeout: 60000,
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 添加 token 等逻辑
  config.headers['token'] = localStorage.getItem('token') || ''
  if (config.method === 'put' || config.method === 'post') {
    for (let key in config.data) {
      if (
        config.data[key] === undefined ||
        config.data[key] === '' ||
        config.data[key] === null
      ) {
        delete config.data[key]
      }
    }
  }
  if (config.method === 'put') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    switch (response.data?.code) {
      case 50000:
      case 50001:
        ElMessage.error(response.data.message)
        return Promise.reject(response.data)
      case 40000:
        ElMessage.error(response.data.message)
        return Promise.reject(response.data.message)
      case 0:
      case 200:
        return Promise.resolve(response.data)
      default:
        return Promise.resolve(response.data)
    }
    // return response.data
  },
  error => {
    return Promise.reject(error)
  },
)
export default service

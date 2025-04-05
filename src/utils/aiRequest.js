import axios from 'axios'
import { APIURL, KEY, modelType } from '@/utils/aiAPI/zhipuConfig.js'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
  timeout: 0, //无时间限制
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 添加 token 等逻辑
  config.headers['Authorization'] = `Bearer ${KEY}`
  config.headers['Content-Type'] = 'application/json'
  // 判断请求方法是否为 POST
  if (config.method === 'post') {
    // 确保有 data 对象
    config.data = config.data || {}
    // 为 POST 请求的参数添加 model 字段
    config.data.model = modelType
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    console.log('响应数据:', response.data.choices[0].message)
    return response.data.choices[0].message.content
  },
  error => {
    console.error('请求错误:', error)
    ElMessage({
      type: 'error',
      message: '请求错误',
    })
    return Promise.reject(error)
  }
)

export default service

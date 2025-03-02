import axios from 'axios'
import { ElMessage } from 'element-plus'
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
    //定义一个变量
    // let message = ''
    // //http状态码
    // console.log(errer.response)

    // const status = errer.response.status
    // switch (status) {
    //   case 401:
    //     message = 'TOKEN过期'
    //     break
    //   case 403:
    //     message = '无权访问'
    //     break
    //   case 404:
    //     message = '请求地址错误'
    //     break
    //   case 500:
    //     message = '服务器出现问题'
    //     break
    //   default:
    //     message = '网络出现问题'
    //     break
    // }
    // ElMessage({
    //   type: 'error',
    //   message,
    // })
    return Promise.reject(error)
  }
)

export default service

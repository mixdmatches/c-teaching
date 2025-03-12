import axios from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: 'http://47.122.30.214:8101',
  timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 添加 token 等逻辑
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
  return config
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    switch (response.data?.code) {
      case 50000:
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

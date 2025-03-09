// 比如这里放用户相关的接口函数
import service from '../utils/request'
import { id } from 'element-plus/es/locale/index'
// 所有接口函数都要以api开头，请求类型，后面跟接口名称，命名最好语义化，统一用箭头函数
export const apiPostLogin = data => service.post('/api/login', data)
export const apiGetUserInfo = () => service.get('/api/user')
export const apiPostAiTopic = data => service.post('/api/ai/topic', data)
export const apiGetStudentInfo = () => service.get('/api/student/info/210047301')
// export const apiUpdateUserInfo = data => service.post('/user/info', data)
// export const apiPostLogin...
// export const apiAddUser...
// export const apiDeleteUser...
export const getUserInfo = id => {
  return service.get(`/api/student/info/${id}`)
}
export const updateUserInfo = data => {
  return service.put(`/api/student/update`, data)
}
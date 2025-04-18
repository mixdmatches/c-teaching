// 比如这里放用户相关的接口函数
import service from '../utils/request'
// 所有接口函数都要以api开头，请求类型，后面跟接口名称，命名最好语义化，统一用箭头函数
export const apiGetUserInfo = () => service.get('/api/user')
export const apiPostAiTopic = data => service.post('/api/ai/topic', data)
export const apiGetStudentInfo = () => service.get('/api/student/info/100001')
export const getUserInfo = async id => {
  return (await service.get(`/api/student/info`)).data
}
export const updateUserInfo = async data => {
  return (await service.put(`/api/student/update`, data)).data
}
/**
 * 登录接口
 * @param {*} param
 * @returns
 */
export const apiPostLogin = ({ studentId, password }) =>
  service.post(`/api/student/login?studentId=${studentId}&password=${password}`)

export const apiPostOutLogin = () => service.get('/api/student/logout')

// 查看学生状态
export const apiGetStauts = () => service.get('/api/student/authority')

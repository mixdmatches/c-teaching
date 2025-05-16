// 比如这里放用户相关的接口函数
import service from '../utils/request'

export const getUserInfo = async () => {
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

/**
 * 退出登录接口
 * @returns
 */
export const apiPostOutLogin = () => service.get('/api/student/logout')

/**
 * 查看学生状态
 * @returns
 */
export const apiGetStauts = () => service.get('/api/student/authority')

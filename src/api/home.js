import service from '../utils/request'

// 获取学习进度
export const apiGetStudyStatus = studentId =>
  service.get(`/api/currentKnow/getstudystatus/${studentId}`)

// 获取已学的知识点列表
export const apiGetStudyPoints = stuId =>
  service.get('/api/plan/getStudyPoints', { params: { stuId } })

import serviceN from '../utils/requestNode'
import service from '../utils/request'
export const apiGetAllChapters = () => serviceN.get('/api/getAllChapters')

// 获取所有知识点
export const apiGetAllPoints = studentId =>
  service.get('/api/knowPoint/allKnowPoint', { params: { studentId } })

export const apiGetPointDetailD = ({ pointId, sectionId, stuNum }) =>
  serviceN.get('/api/getpointdetail', {
    params: { pointId, sectionId, stuNum },
  })

// 获取知识点详情
export const apiGetPointDetail = ({ pointId, sectionId, studentId }) =>
  service.post('/api/knowPoint/info', { pointId, sectionId, studentId })

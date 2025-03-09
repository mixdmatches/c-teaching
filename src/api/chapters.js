import service from '../utils/requestNode'
export const apiGetAllChapters = () => service.get('/api/getAllChapters')
export const apiGetAllPoints = id => service.get('/api/getAllPoints')
export const apiGetStudyPoints = id => service.get('/api/getStudyPoints')
export const apiGetPointDetail = ({ pointId, sectionId, stuNum }) =>
  service.get('/api/getpointdetail', { params: { pointId, sectionId, stuNum } })

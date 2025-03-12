import service from '../utils/requestNode'
export const apiGetStudyStatus = stuNum => service.get('/api/getstudystatus')

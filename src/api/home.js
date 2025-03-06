import service from '../utils/request'
export const apiGetStudyStatus = id => service.get('/api/getStudyStatus')

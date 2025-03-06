import service from '../utils/request'
export const apiGetAllChapters = () => service.get('/api/getAllChapters')
export const apiGetAllPoints = id => service.get('/api/getAllPoints')
export const apiGetStudyPoints = id => service.get('/api/getStudyPoints')

import service from '@/utils/request.js'
export const getQuestionBySectionId = async params => {
  return (await service.get('/api/topic/section', { params })).data
}
export const getQuestionByKnowledge = async data => {
  return (await service.post('/api/topic/knowledge', data)).data
}
export const getAnswer = async data => {
  return (await service.post('/api/topic/result', data)).data
}
export const getNextQuestion = async data => {
  return (await service.post('/api/topic/nextTopic', data)).data
}
/**
 * 获取错题
 */
export const getErrorQuestion = async params =>
  service.get('/api/topic/wrong', { params })
export const postSameQs = topicId =>
  service.post(`/api/topic/sameType?topicId=${topicId}`)

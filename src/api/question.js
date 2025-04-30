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
export const handleGetAndSubmitQuestion = params => {
  return getNextQuestion({
    ...params,
    topicId: params.topicId ?? 0,
    knowPointId: params.knowPointId,
  })
}
export const getSimilarQuestion = async data => {
  return (await service.post('/api/topic/sameType', { topicId: data })).data
}
/**
 * 获取错题
 */
export const getErrorQuestion = async params =>
  service.get('/api/topic/wrong', { params })
/**
 * 获取相似题
 * @param {*} topicId
 * @returns
 */
export const postSameQs = topicId =>
  service.post(`/api/topic/sameType?topicId=${topicId}`)
// 提交错题
export const submitSameTypeResult = async data => {
  return (await service.post('/api/topic/sameTypeResult', data)).data
}
// 获取下一章知识点
export const getNextKnowledge = async data => {
  return (await service.post('/api/knowPoint/next', data)).data
}

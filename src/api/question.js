import service from "@/utils/request.js";
export const getQuestionBySectionId = (params) => {
  return service.get('/api/topic/section',{params})
}
export const getQuestionByKnowledge = (data) => {
  return service.post('/api/topic/knowledge',data)
}
export const getAnswer = (data) => {
  return service.post('/api/topic/result',data)
}
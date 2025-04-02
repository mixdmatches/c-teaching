import service from '../utils/requestNode'
/**
 * 获取笔记列表
 * @returns
 */
export const apiGetNotes = (params = {}) =>
  service.get('/api/notes', { params })

/**
 * 添加笔记
 * @param {*} data
 * @returns
 */
export const apiAddNotes = data => service.post('/api/notes', data)

/**
 * 删除笔记
 * @param {*} id
 * @returns
 */
export const apiDeleteNote = id => service.delete(`/api/notes/${id}`)

/**
 * 更新笔记
 * @returns
 */
export const apiPutNote = data => service.put(`/api/notes/${data.id}`, data)

/**
 * 模糊词搜索笔记
 * @param {*} keyword
 * @returns
 */
export const apiGetSerchNotes = keyword =>
  service.get(`/api/notes/search?keyword=${keyword}`)

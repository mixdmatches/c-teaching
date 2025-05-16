import service from '../utils/request'
/**
 * 获取笔记列表
 * @returns
 */
export const apiGetNotes = () => service.get('/api/notebook/allNotebook')

/**
 * 添加笔记
 * @param {*} params
 * @returns
 */
export const apiAddNotes = ({ content, isStar }) =>
  service.post('/api/notebook/addNotebook', {
    context: content,
    isStar: isStar ? 1 : 0,
  })

/**
 * 彻底删除笔记
 * @param {*} ids
 * @returns
 */
export const apiDeleteNote = ids =>
  service.post(`/api/notebook/deleteNotebook`, ids)

/**
 * 更新笔记
 * @param {*} data
 * @returns
 */
export const apiPutNote = data => {
  let updateNote = {
    id: data.id,
    context: data.content,
    isStar: data.isStar ? 1 : 0,
    isDelete: data.isDelete ? 1 : 0,
  }
  return service.put('/api/notebook/updateNotebook', updateNote)
}

/**
 * 模糊词搜索笔记
 * @param {*} keyword
 * @returns
 */
export const apiGetSerchNotes = keyword =>
  service.get(`/api/notebook/searchNotebook?keyword=${keyword}`)

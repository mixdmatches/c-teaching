import { allPoints } from './data/data'

allPoints.forEach(item => (item.knowState = 2))

// 分页获取知识点列表
const getPoints = ({ query }) => {
  const { page, size, sectionId, knowState } = query
  const start = (page - 1) * size
  const end = start + size
  return {
    points: allPoints.slice(start, end),
  }
}

export default [
  // 获取所有章节
  {
    url: '/api/getAllChapters',
    method: 'get',
    response: () => ({
      chapters: allPoints
        .map(item => ({
          sectionId: item.sectionId,
          sectionName: item.sectionName,
        }))
        .filter(
          (item, index, arr) =>
            arr.findIndex(i => i.sectionId === item.sectionId) === index
        ),
    }),
  },
  // 获取所有知识点
  {
    url: '/api/getAllPoints',
    method: 'get',
    response: id => ({
      points: allPoints,
    }),
  },
  //获取用户已学的知识点
  {
    url: '/api/getStudyPoints',
    method: 'get',
    response: () => ({
      points: allPoints.filter(
        item => item.pointId === 2 || item.pointId === 3
      ),
    }),
  },
  // 分页获取知识点列表
  {
    url: '/api/getPoints',
    method: 'get',
    response: ({ query }) => {
      const { page, size, sectionId, statusId } = query
      const start = (page - 1) * size
      const end = start + size
      return {
        points: allPoints.slice(start, end),
      }
    },
  },
  {
    url: '/api/getpointdetail',
    get: 'get',
    response: () => {
      
    }
  },
]

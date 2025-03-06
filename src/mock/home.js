export default [
  {
    url: '/api/getStudyStatus',
    method: 'get',
    // id：用户id
    response: id => ({
      pointId:1,
      pointName: 'C语言历史',
      nextPointName: 'C语言基础',
    }),
  },
]

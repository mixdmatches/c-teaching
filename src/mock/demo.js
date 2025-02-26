export default [
  {
    url: '/api/paged-list',
    method: 'get',
    response: ({ query }) => ({
      code: 0,
      data: {
        'list|10': [
          {
            'id|+1': 1,
            title: '@ctitle(5,10)',
            'views|100-999': 1,
            'status|1': ['published', 'draft', 'deleted'],
            createTime: '@datetime',
          },
        ],
        total: 100,
        page: Number(query.page) || 1,
        pageSize: Number(query.pageSize) || 10,
      },
    }),
  },
]

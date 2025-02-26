import { mock } from 'mockjs'

export default [
  {
    url: '/api/list',
    method: 'get',
    response: () => {
      return mock({
        'list|10': [
          {
            'id|+1': 1,
            name: '@cname',
            email: '@email',
          },
        ],
      })
    },
  },
]

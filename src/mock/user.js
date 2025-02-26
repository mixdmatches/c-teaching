export default [
  {
    url: '/api/user',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: {
          name: '小明',
          age: 18,
          avatar: '@image(100x100)',
        },
      }
    },
  },
]

export default [
  // 获取用户信息
  {
    url: '/api/user',
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        id: '@guid',
        name: '@cname',
        age: '@integer(20,60)',
        avatar: '@image(100x100)',
        address: '@county(true)',
      },
    }),
  },

  // 登录接口
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000, // 模拟延迟
    response: ({ body }) => ({
      code: body.username === 'admin' ? 0 : -1,
      message: body.username === 'admin' ? '登录成功' : '用户名错误',
      token: '@string(32)',
    }),
  },
]

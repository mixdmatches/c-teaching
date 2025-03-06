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
                    },
                ],
                total: 100,
                page: Number(query.page) || 1,// 当前页
                pageSize: Number(query.pageSize) || 10,//每页10条
            },
        }),
    },
]

const option = ['A', 'B', 'C', 'D',]
export default [
    {
        url: '/api/get-question',
        method: 'get',
        response: ({ query }) => ({
            code: 0,
            'data|1-10': [
                {
                    'no|1-100': 1,
                    type: 'radio',
                    'difficulty|1-5': 1,
                    'emphasis|1-5': 1,
                    'tags|0-2': [
                        {
                            tagName: '循环'
                        },
                        {
                            tagName: '数组'
                        }
                    ],
                    title: '@ctitle(1,30)',//生成一个默认长度的中文词语
                    options: option.map(item => {
                        return {
                            id: item,
                            text: '@cword(3,10)',
                        }
                    })
                }
            ]
        })
    },
    {
        url: '/api/get-question-result',
        method: 'get',
        response: ({ query }) => ({
            code: 0,
            data: {
                'rightRate|0-100': 1,
                'rightNumber|0-10': 1,
                'maxNumber|5-10': 1,
                'time|0-100': 1,
                'practisedRate|0-100': 1,
                'questionList|1-10': [
                    {
                        'no|1-100': 1,
                        type: 'radio',
                        'difficulty|1-5': 1,
                        'emphasis|1-5': 1,
                        'tags|0-2': [
                            {
                                tagName: '循环'
                            },
                            {
                                tagName: '数组'
                            }
                        ],
                        title: '@ctitle(5,10)',
                        options: ['A', 'B', 'C', 'D'].map(item => {
                            return {
                                id: item,
                                text: '@cword(3,10)',
                            }
                        }),
                        'selectId|1': option,
                        'rightId|1': option,
                        AIAnalysis: '@csentence(10,100)',
                    }
                ]
            }
        })
    }
]
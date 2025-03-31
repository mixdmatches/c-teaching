export default [
    {//生成题目
        url:'api/get-question',
        method:'post',
        response:({query})=>({
            code:0,
           //返回的题目用数组包含
           'data|1-10':[
            {
                'no|1-10':1,
                'type':'radio',
                'difficulty|1-5':1,
                'emphasias|1-5':1,
                'tags|0-2':[
                    {
                        tagName:'循环',
                    },
                    {
                        tagName:'数组',
                    }
                ],
                'title':'@ctitle(1,30)',
                'options':['A','B','C','D'].map(item=>({
                    id:item,
                    text:'@cword(1,10)'
                }))
            }
           ]

        }),
    },
    //生成结果
    {
        url: 'api/get-result',
        methodL: 'post',
        response: ({ query }) => ({
            code: 0,
            data: {
                'rightRate|0-100':85,
                'rightNumber|0-10':6,
                'time|0-100':10,
                'proficiencyLevel|1-5': 3,//熟练程度
                //题目列表
                'questionLisr|1-10':[
                    {
                        'no|1-10': 1,
                        'type': 'radio',
                        'difficulty|1-5': 1,
                        'emphasias|1-5': 1,
                        'tags|0-2': [
                            {
                                tagName: '循环',
                            },
                            {
                                tagName: '数组',
                            }
                        ],
                        'title': '@ctitle(1,30)',
                        'options': ['A', 'B', 'C', 'D'].map(item => ({
                            id: item,
                            text: '@cword(1,10)'
                        }))
                    }
                ],
                'selectId':'A',
                'rightId':'B',
                AIAnalysis: '@csentence(10,100)'
            }
        })
    }
]
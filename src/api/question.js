import service from '../utils/request'

export async function getQuestionListByPointId (pointId) {
    const response = await service.get('/api/topic/section',{
        params:{
            pointId:pointId
        }
    })
    if(response.status === 200 && response.data.code === 200){
        return response.data.data
    } else {
        throw new Error('获取题目列表失败')
    }
}
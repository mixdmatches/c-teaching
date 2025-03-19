import axios from 'axios'
// ai对话接口
export const apiPostAiTalk = question =>
  axios.get('http://47.122.30.214:8101/api/knowPoint/aiAsk', {
    params: { question },
  })

export const apiPostAiTalkNode = question =>
  axios.get('http://127.0.0.1:3007/api/aiTalk', {
    params: { question },
  })

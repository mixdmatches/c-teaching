import axios from 'axios'
import service from '@/utils/aiRequest.js'
import {
  generateConfigChapter,
  generateConfigTopic,
} from '@/utils/aiAPI/zhipuConfig.js'
// ai对话接口
export const apiPostAiTalk = question =>
  axios.get('http://47.122.30.214:8101/api/knowPoint/aiAsk', {
    params: { question },
  })
// ai对话接口Node版流式响应
export const apiPostAiTalkNode = question =>
  axios.get('http://127.0.0.1:3007/api/aiTalk', {
    params: { question },
  })

// 获取题目--全是这个章节的相关的
export const apiPostChapterAi = (chapter, questionCount) =>
  service({
    method: 'post',
    url: '',
    data: generateConfigChapter(chapter, questionCount),
  })

// 获取题目--全是某一章节某一个知识点的相关的
export const apiPostTopicAi = (chapter, topic, questionCount) =>
  service({
    method: 'post',
    url: '',
    data: generateConfigTopic(chapter, topic, questionCount),
  })

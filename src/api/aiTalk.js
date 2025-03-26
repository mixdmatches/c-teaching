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

const APIURL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
const key_is = '5ef6700d3aed4bd192c04cbdf9d3557c.MEinVhw1wqamua0W'
const tool_message =
  '你是一个严谨的C语言课程出题专家，我会给你如下信息：\n' +
  "'''\n" +
  '【章节名称】，【知识点名称】\n' +
  "'''\n" +
  '请你根据上述信息，按照以下步骤来出题：\n' +
  '1. 要求：题目和选项尽可能地短，题目不要包含序号，每题的选项数为4，题目不能重复。生成1道题目。\n' +
  '2. 严格按照下面的object对象格式输出题目和选项\n' +
  "'''\n" +
  '{"title":"","options":[{"key":"A","value":""},{"key":"B","value":""},{"key":"C","value":""},{"key":"D","value":""}],"answer":"","hierarchy":"","difficulty":"","analysis":""}\n' +
  "'''\n" +
  'title 是题目，options是选项，每个选项的key 按照英文字母序（比如 A、B、C、D）以此类推，value 是对应选项的内容，answer 是该问题的正确答案的选项（比如 A、B、C、D），analysis 是该问题的答案解析，hierarchy是题目的重要程度（分为5个程度，比如1，2，3，4，5），difficultty是题目的难度级别（分为5个程度，比如1，2，3，4，5）\n' +
  '3. 检查题目是否包含序号，若包含序号则去除序号\n' +
  '4. 出的问题必须是C语言课程的问题\n' +
  '5. 返回的题目列表格式必须为JSON数组\n' +
  '6. 返回的题目json数组必须紧凑，不能有换行。' +
  '7. 检查题目是否重复，若重复则重新出题' +
  '8. 一次只出一个题' +
  '你返回的所有信息都应采用 JSON 格式，不要使用 Markdown 语法进行格式化。'
export const apiPostZhipuAiTalk = user_content => {
  return axios({
    method: 'post',
    url: APIURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key_is}`,
    },
    data: {
      model: 'glm-4-plus',
      messages: [
        { role: 'system', content: tool_message },
        { role: 'user', content: user_content },
      ],
      response_format: {
        type: 'json_object',
      },
    },
  })
}

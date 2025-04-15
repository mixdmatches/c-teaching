/**接口地址 */
export const APIURL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
/**密钥 */
export const KEY = '5ef6700d3aed4bd192c04cbdf9d3557c.MEinVhw1wqamua0W'

export const modelType = 'glm-4-plus'
// 模拟章节和知识点数据
const chapters = [
  {
    chapter: '第一章 程序设计和C语言',
    topics: [
      {
        topic: '计算机程序设计',
        hierarchy: 2,
        difficulty: 1,
      },
      {
        topic: 'C语言发展特点',
        hierarchy: 2,
        difficulty: 1,
      },
      {
        topic: '简单C程序介绍',
        hierarchy: 3,
        difficulty: 1,
      },
      {
        topic: '运行C程序步骤',
        hierarchy: 3,
        difficulty: 1,
      },
      {
        topic: '程序设计的任务',
        hierarchy: 2,
        difficulty: 1,
      },
    ],
  },
  {
    chapter: '第二章 算法——程序的灵魂',
    topics: [
      {
        topic: '什么是算法',
        hierarchy: 3,
        difficulty: 1,
      },
      {
        topic: '简单算法举例',
        hierarchy: 3,
        difficulty: 2,
      },
      {
        topic: '算法的特性',
        hierarchy: 3,
        difficulty: 1,
      },
      {
        topic: '算法表示方法',
        hierarchy: 3,
        difficulty: 2,
      },
      {
        topic: '结构化程序设计',
        hierarchy: 3,
        difficulty: 2,
      },
    ],
  },
  {
    chapter: '第三章 最简单的C程序设计——顺序程序设计',
    topics: [
      {
        topic: '数据表现与运算',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: 'C语句概述',
        hierarchy: 3,
        difficulty: 1,
      },
      {
        topic: '数据输入输出',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '顺序程序举例',
        hierarchy: 4,
        difficulty: 2,
      },
    ],
  },
  {
    chapter: '第四章 选择结构程序设计',
    topics: [
      {
        topic: '选择结构判断',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: 'if语句选结构',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '关系运算表达式',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '逻辑运算表达式',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '条件运算表达式',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '选择结构嵌套',
        hierarchy: 4,
        difficulty: 3,
      },
      {
        topic: 'switch多分支选',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '选择程序综合例',
        hierarchy: 4,
        difficulty: 3,
      },
    ],
  },
  {
    chapter: '第五章 循环结构程序设计',
    topics: [
      {
        topic: '循环控制原因',
        hierarchy: 3,
        difficulty: 1,
      },
      {
        topic: 'while语句循环',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: 'do-while语句循环',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: 'for语句循环',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '循环的嵌套',
        hierarchy: 4,
        difficulty: 3,
      },
      {
        topic: '几种循环比较',
        hierarchy: 3,
        difficulty: 2,
      },
      {
        topic: '改变循环状态',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '循环程序举例',
        hierarchy: 4,
        difficulty: 3,
      },
    ],
  },
  {
    chapter: '第六章 利用数组处理批量数据',
    topics: [
      {
        topic: '数组使用原因',
        hierarchy: 3,
        difficulty: 1,
      },
      {
        topic: '一维数组定义',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '二维数组定义',
        hierarchy: 4,
        difficulty: 3,
      },
      {
        topic: '字符数组',
        hierarchy: 4,
        difficulty: 2,
      },
    ],
  },
  {
    chapter: '第七章 用函数实现模块化程序设计',
    topics: [
      {
        topic: '函数使用原因',
        hierarchy: 3,
        difficulty: 1,
      },
      {
        topic: '函数定义方法',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '函数的调用',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '函数声明原型',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '函数嵌套调用',
        hierarchy: 4,
        difficulty: 3,
      },
      {
        topic: '函数递归调用',
        hierarchy: 4,
        difficulty: 4,
      },
      {
        topic: '数组作函数参数',
        hierarchy: 4,
        difficulty: 3,
      },
      {
        topic: '局部全局变量',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '变量存储生存期',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '变量声明定义',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '内外函数区别',
        hierarchy: 3,
        difficulty: 2,
      },
    ],
  },
  {
    chapter: '第八章 善于利用指针',
    topics: [
      {
        topic: '指针的概念',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '指针变量',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '指针引用数组',
        hierarchy: 4,
        difficulty: 3,
      },
      {
        topic: '指针引用字符串',
        hierarchy: 4,
        difficulty: 3,
      },
      {
        topic: '指向函数指针',
        hierarchy: 4,
        difficulty: 4,
      },
      {
        topic: '返回指针函数',
        hierarchy: 4,
        difficulty: 4,
      },
      {
        topic: '指针数组多重',
        hierarchy: 4,
        difficulty: 4,
      },
      {
        topic: '动态内存指针',
        hierarchy: 4,
        difficulty: 4,
      },
      {
        topic: '指针知识小结',
        hierarchy: 3,
        difficulty: 2,
      },
    ],
  },
  {
    chapter: '第九章 用户自己建立数据类型',
    topics: [
      {
        topic: '结构体变量使用',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '结构体数组使用',
        hierarchy: 4,
        difficulty: 3,
      },
      {
        topic: '结构体指针',
        hierarchy: 4,
        difficulty: 3,
      },
      {
        topic: '指针处理链表',
        hierarchy: 4,
        difficulty: 4,
      },
      {
        topic: '共用体类型',
        hierarchy: 3,
        difficulty: 2,
      },
      {
        topic: '枚举类型使用',
        hierarchy: 3,
        difficulty: 2,
      },
      {
        topic: 'typedef声明类型',
        hierarchy: 3,
        difficulty: 2,
      },
    ],
  },
  {
    chapter: '第十章 对文件的输入输出',
    topics: [
      {
        topic: '文件的概念',
        hierarchy: 3,
        difficulty: 1,
      },
      {
        topic: '文件类型指针',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '文件打开关闭',
        hierarchy: 4,
        difficulty: 2,
      },
      {
        topic: '文件读写操作',
        hierarchy: 4,
        difficulty: 3,
      },
      {
        topic: '文件定位方法',
        hierarchy: 4,
        difficulty: 3,
      },
      {
        topic: '文件读写检测',
        hierarchy: 4,
        difficulty: 3,
      },
    ],
  },
]

const question = {
  title: '',
  options: [
    { key: 'A', value: '' },
    { key: 'B', value: '' },
    { key: 'C', value: '' },
    { key: 'D', value: '' },
  ],
  answer: '',
  hierarchy: '',
  difficulty: '',
  analysis: '',
  chapter: '',
  topic: '',
}
// 按知识点生成题目的提示信息
export const TOOL_MESSAGE = {
  /**生成题目信息--按章节和知识点 */
  topic: (chapter, topics, questionCount) => {
    return `你是一个严谨的C语言课程出题专家，我会给你如下信息：
            '''
            {chapter: '${chapter}',
            topics: [${topics.map(t => `'${t.topic}'`).join(',')}],}
            'chapter是章节名，topics是该章节下的多个知识点'
            请你根据上述信息，按照以下步骤来出题：
            1. 要求：题目和选项尽可能地短，题目不要包含序号，每题的选项数为4，题目不能重复。生成${questionCount}道题目。
            2. 严格按照下面的object对象格式输出题目和选项
            '''
            [{"title":"","options":[{"key":"A","value":""},{"key":"B","value":""},{"key":"C","value":""},{"key":"D","value":""}],"answer":"","hierarchy":"","difficulty":"","analysis":"","chapter":"","topic":""}]
            '''
            title 是题目，options是选项，每个选项的key 按照英文字母序（比如 A、B、C、D）以此类推，value 是对应选项的内容，answer 是该问题的正确答案的选项（比如 A、B、C、D），analysis 是该问题的答案解析，hierarchy是题目的重要程度（分为5个程度，比如1，2，3，4，5），difficulty是题目的难度级别（分为5个程度，比如1，2，3，4，5）,chapter是章节名，topic是知识点名称
            3. 检查题目是否包含序号，若包含序号则去除序号
            4. 出的问题必须是C语言课程的问题
            5. 返回的题目列表格式必须为JSON数组
            6. 返回的题目json数组必须紧凑，不能有换行。
            7. 检查题目是否重复，若重复则重新出题
            8. 题目相关的章节和知识点按照这个${JSON.stringify(chapters)}来出，给出的章节名称格式为第XX章。`
  },
  /**生成知识点熟练度信息--按题目和用户答案 */
  proficiency: (question, userAnswer) => {
    return `你是一个严谨的根据C语言知识点题目给出用户对该知识点熟练度专家，我会给你如下信息：
            '''
            {question: ${question},
            userAnswer: ${userAnswer}}
            'question是题目信息，包含题目标题title、正确答案answer和知识点topic等信息；userAnswer是用户的答案'
            请你根据上述信息，按照以下步骤来评估学生对知识点的熟练度：
            1. 要求：对于每个知识点，计算学生答对的题目数量占该知识点总题目数量的比例，以百分比形式表示熟练度，如 18%。
            2. 严格按照下面的 JSON 对象格式输出评估结果
            '''
            [{"topic":"","proficiency":"0%"}]
            '''
            topic 是知识点名称，proficiency 是该知识点的熟练度百分比。
            3. 出的评估结果必须是针对C语言题目的知识点的熟练度。
            4. 返回的评估结果列表格式必须为 JSON 对象。
            5. 返回的评估结果 json 对象必须紧凑，不能有换行。
            6. 题目相关的章节和知识点按照这个${JSON.stringify(chapters)}来确定。`
  },
  /** 对话 **/
}

/**
 * 生成题目信息--按章节
 * @param {*} c 章节id
 * @param {*} questionCount 题目数量
 */
export const generateConfigChapter = (c, questionCount) => {
  const chapter = chapters[c - 1]
  const { chapter: chapterName, topics } = chapter
  return {
    messages: [
      {
        role: 'system',
        content: TOOL_MESSAGE.topic(chapterName, topics, questionCount),
      },
      {
        role: 'user',
        content: `出这一章下面的相关题目${JSON.stringify(chapter)}`,
      },
    ],
    response_format: {
      type: 'json_object',
    },
  }
}

/**
 * 生成题目信息--按章节的某一个知识点
 * @param {*} c 章节id
 * @param {*} t 知识点id
 * @param {*} questionCount 题目数量
 * @returns
 */
export const generateConfigTopic = (c, t, questionCount) => {
  let chapter = chapters[c - 1]
  const { chapter: chapterName, topics } = chapter
  const topic = topics[t - 1]
  return {
    messages: [
      {
        role: 'system',
        content: TOOL_MESSAGE.topic(chapterName, [topic], questionCount),
      },
      {
        role: 'user',
        content: `出这一章下面一个已指定的知识点的相关题目${JSON.stringify(chapter)}`,
      },
    ],
    response_format: {
      type: 'json_object',
    },
  }
}

// 生成熟练度信息--传题目和用户答案
/**
 * @param {*} question 题目信息，包含题目标题title、正确答案answer和知识点topic等信息
 * @param {*} userAnswer 用户的答案
 * @returns 评估结果，包含知识点名称topic和熟练度proficiency
 * @example 输入：{question: {title: '1+1=?', answer: '2', topic: '数学'}, userAnswer: '2'}
 * 输出：{"topic":"数学","proficiency":"100%"}
 * */
export const generateConfigProficiency = (question, userAnswer) => {
  return {
    messages: [
      {
        role: 'system',
        content: TOOL_MESSAGE.proficiency(question, userAnswer),
      },
      {
        role: 'user',
        content: `评估用户对该题目的知识点的熟练度${JSON.stringify(question)}`,
      },
    ],
    response_format: {
      type: 'json_object',
    },
  }
}
/**
 * ai流式对话
 * @param {*} question 用户输入的问题
 * @returns
 */
// 你是一个萌妹纸，语气软软的，说话带颜文字，
// 你是我的仆人，我是你主人，语气要有和我玩sm的感觉，
export const generateConfigTalk = question => {
  return JSON.stringify({
    model: modelType,
    messages: [
      {
        role: 'system',
        content:
          '简单回答，200字以内，如果提到c语言相关的就回答c语言相关的，可以有一些c语言代码示例，你是一个萌妹纸，语气软软的，说话带颜文字，',
      },
      {
        role: 'user',
        content: question,
      },
    ],
    stream: true,
  })
}

<template>
  <div ref="rightDom" class="right">
    <div class="right-top">
      <span class="title">ai对话</span>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="清空对话"
        placement="top"
      >
        <el-icon style="font-size: 1.6em" @click="handleClearTalk"
          ><Delete
        /></el-icon>
      </el-tooltip>
    </div>
    <div class="talk" v-if="talkGroupArr.length !== 0">
      <div class="talk-group" v-for="item in talkGroupArr" :key="item">
        <div class="message-right">
          {{ item.question }}
        </div>
        <div
          class="font-10 message-left markdown-container"
          v-html="item.answer"
        ></div>
      </div>
    </div>
    <div class="talk-none" v-else>
      <div class="title">
        <span>👋</span>
        <span>你好，我是你的ai助手</span>
      </div>
    </div>
    <div class="right-bottom">
      <el-input
        size="large"
        v-model="question"
        placeholder="请输入问题"
        @keyup.enter="handleSendQuestion"
      ></el-input>
      <el-button
        size="large"
        @click="handleSendQuestion"
        :loading="isLoading"
        :disabled="question === ''"
        >发送</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Bubble } from 'ant-design-x-vue'
// 引入api
import { apiPostAiTalk, apiPostAiTalkNode, apiPostTalk } from '@/api/aiTalk.js'
import { marked } from 'marked'
import hljs from 'highlight.js'
// 引入高亮样式
import 'highlight.js/styles/monokai-sublime.css'
// 导入所有语言
import 'highlight.js/lib/languages/javascript'
import { ElMessage } from 'element-plus'
// 配置marked高亮
marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code).value
  },
})
// rightDom元素
const rightDom = ref()
// 发送消息
const question = ref('')
// 定义ai返回的数据
const answer = ref('')
// 对话信息
const talkGroupArr = ref([])
// 加载状态
const isLoading = ref(false)
// 向ai发起对话-----------------第一版接java后端，不可流式
const handleSendQuestion1 = async () => {
  // 请求开始前，将加载状态设置为 true
  isLoading.value = true
  // 检查问题是否为空
  if (!question.value.trim()) {
    ElMessage.warning('请输入问题')
    isLoading.value = false
    return
  }
  talkGroupArr.value.push({
    question: question.value,
    answer: '等待响应',
  })
  try {
    let buffQestion = question.value || selectedText
    question.value = ''
    const res = await apiPostAiTalk(buffQestion)
    if (res.data.code != 0) {
      talkGroupArr.value[talkGroupArr.value.length - 1].answer =
        res.data.message
    } else {
      answer.value = res.data.data
      talkGroupArr.value[talkGroupArr.value.length - 1].answer = answer.value
    }
  } catch (err) {
    talkGroupArr.value[talkGroupArr.value.length - 1].answer = err.message
  } finally {
    isLoading.value = false
  }
}

// Ai流式响应对话-----------------------第二版接后端Node可流式
const handleSendQuestion2 = async (event, selectedText) => {
  // 请求开始前，将加载状态设置为 true
  isLoading.value = true
  talkGroupArr.value.push({
    question: selectedText || question.value,
    answer: '等待响应',
  })
  let buffQestion = selectedText || question.value
  question.value = ''
  // 创建 EventSource 实例
  const eventSource = new EventSource(
    `http://localhost:3007/api/streamAiTalk?question=${buffQestion}`
  )
  talkGroupArr.value[talkGroupArr.value.length - 1].answer = ''
  // 监听 message 事件
  eventSource.onmessage = event => {
    talkGroupArr.value[talkGroupArr.value.length - 1].answer += event.data
  }
  // 监听 error 事件
  eventSource.onerror = error => {
    console.error('EventSource failed:', error)
    isLoading.value = false
    talkGroupArr.value[talkGroupArr.value.length - 1].answer = marked.parse(
      talkGroupArr.value[talkGroupArr.value.length - 1].answer
    )
    eventSource.close()
  }
  // 监听事件源关闭事件
  eventSource.onclose = () => {
    // 事件源关闭时，将加载状态设置为 false
    isLoading.value = false
    // 流式响应结束后，再进行 Markdown 解析
    talkGroupArr.value[talkGroupArr.value.length - 1].answer = marked.parse(
      talkGroupArr.value[talkGroupArr.value.length - 1].answer
    )
  }
}

// 第三版ai流式，前端直接接智谱平台API---------------------无敌了
const handleSendQuestion = async (event, selectedText) => {
  // 请求开始前，将加载状态设置为 true
  isLoading.value = true
  talkGroupArr.value.push({
    question: selectedText || question.value,
    answer: '等待响应',
  })
  let buffQestion = selectedText || question.value
  question.value = ''
  talkGroupArr.value[talkGroupArr.value.length - 1].answer = ''
  try {
    await getChat(buffQestion)
    // 流式响应结束后，再进行 Markdown 解析
    talkGroupArr.value[talkGroupArr.value.length - 1].answer = marked.parse(
      talkGroupArr.value[talkGroupArr.value.length - 1].answer
    )
    isLoading.value = false
  } catch (err) {
    const htmlStr = `<div class="error">糟糕出错了！请重试！</div>`
    talkGroupArr.value[talkGroupArr.value.length - 1].answer += htmlStr
    isLoading.value = false
  }
}

// 获取ai返回的信息并拼接到页面对话框上
const getChat = async content => {
  const res = await apiPostTalk(content)
  const reader = res.body.getReader()
  // 文本解码器，用于将二进制数据解码为文本
  const decoder = new TextDecoder()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const text = decoder.decode(value)
    const lines = text
      .split('\n')
      .map(line => line.replace(/^data: /, '').trim())
      .filter(line => line.trim() !== '')
    for await (const line of lines) {
      if (line === '[DONE]') break
      const data = JSON.parse(line)
      const content = data.choices[0].delta.content
      talkGroupArr.value[talkGroupArr.value.length - 1].answer += content
    }
  }
}

// 监听ai返回的信息
watch(
  () => answer.value,
  (newVal, oldVal) => {
    if (newVal) {
      // 进行 Markdown 解析
      const parsedAnswer = marked.parse(newVal)
      talkGroupArr.value[talkGroupArr.value.length - 1].answer = parsedAnswer
    }
  }
)

// 清空对话
const handleClearTalk = () => {
  talkGroupArr.value = []
}

// 把handleSendQuestion函数暴露给父组件
defineExpose({ handleSendQuestion })
</script>

<style lang="scss" scoped>
.font-10 {
  // 恢复字体大小
  font-size: 10px;
}
@mixin talk-body {
  flex: 1;
  padding: $padding-xl;
  display: flex;
  flex-direction: column;
  gap: 50px;
  overflow-y: auto;
}
/* 定义 slide-fade 动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(300px);
  opacity: 0;
}
.right {
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;
  background-color: rgb(240, 244, 251);
  transition: all 0.5s ease;
  .right-top {
    background-color: $primary-color;
    padding: $padding-l;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    border-radius: $border-radius-s $border-radius-s 0 0;
    .title {
      font-size: $font-size-xl;
      flex: 1;
    }
  }
  .talk {
    @include talk-body();
    // 滚动条颜色改变
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgb($primary-color, 0.1);
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background-color: rgb(240, 244, 251);
    }
    .talk-group {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;
      .message-right {
        flex: 1;
        align-self: flex-end;
        background-color: $primary-color;
        color: #fff;
        font-size: $font-size-m;
        line-height: 1.7;
        padding: $padding-l;
        border-radius: $border-radius-l;
        border-top-right-radius: 0;
      }
      .message-left {
        flex: 1;
        max-width: 100%;
        background-color: #fff;
        color: $text-color;
        font-size: $font-size-l;
        line-height: 1.7;
        padding: $padding-l $padding-m;
        border-radius: $border-radius-l;
        border-top-left-radius: 0;
      }
    }
  }
  .talk-none {
    @include talk-body();
    .title {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: $font-size-xl;
    }
  }
  .right-bottom {
    display: flex;
    gap: 0.5em;
    background-color: rgb(240, 244, 251);
    padding: $padding-m;
    border-radius: 0 0 $border-radius-s $border-radius-s;
  }
}
</style>

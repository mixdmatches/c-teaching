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
      <!-- <el-icon style="font-size: 1.6em" @click="handleCloseAi"
        ><CloseBold
      /></el-icon> -->
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
        :disabled="isLoading"
        >发送</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
// 引入api
import { apiPostAiTalk, apiPostAiTalkNode } from '@/api/aiTalk.js'
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
const emit = defineEmits(['closeAi'])
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
// 向ai发起对话
const handleSendQuestionp = async () => {
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
    let buffQestion = question.value
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

// Ai流式响应对话
const handleSendQuestion = async () => {
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
  let buffQestion = question.value
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
    console.error('EventSource 发生错误:', error)
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

// ai回答文本转html
const htmlTalkArr = computed(() => {
  return talkGroupArr.value.map(item => {
    item.answer = marked.parse(item.answer)
    return item
  })
})

// 通知父组件关闭ai
const handleCloseAi = () => {
  emit('closeAi')
}

// 清空对话
const handleClearTalk = () => {
  talkGroupArr.value = []
}

;[
  {
    question: '你好',
    answer:
      "你好，我是AI，很高兴为你服务。下面是一个简单的 JavaScript 函数示例：\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\nconsole.log(greet('World'));\n```",
  },
  {
    question: '你是谁',
    answer:
      '我是AI，很高兴为你服务。这里有一个 Python 的示例代码：\n```python\nname = "World"\nprint(f"Hello, {name}!")\n```',
  },
  {
    question: '微任务是什么',
    answer:
      "微任务（Microtask）是 JavaScript 异步编程中的一个概念。它是在当前任务执行结束后，下一个宏任务开始之前执行的异步任务。以下是一个使用 `Promise` 创建微任务的示例：\n```javascript\nconsole.log('Start');\n\nPromise.resolve().then(() => {\n  console.log('This is a microtask');\n});\n\nconsole.log('End');\n```",
  },
]
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
  flex: 1;
  height: calc(100vh - 150px); /* 假设底部留 20px 空白 */
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

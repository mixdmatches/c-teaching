<template>
  <div class="right">
    <TalkHeader @clear-talk="handleClearTalk" />
    <div v-if="talkGroupArr.length !== 0" class="talk">
      <TalkGroup
        v-model:talk-group-arr="talkGroupArr"
        @send-question="handleSendQuestion"
      />
    </div>
    <div v-else class="talk-none">
      <TalkNoMsg />
    </div>
    <TalkInput @send-question="handleSendQuestion" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 引入组件
import TalkHeader from './TalkHeader.vue'
import TalkNoMsg from './TalkNoMsg.vue'
import TalkGroup from './TalkGroup.vue'
import TalkInput from './TalkInput.vue'
// 引入api
import { apiPostTalk } from '@/api/aiTalk.js'

// 发送消息
const question = ref('')
// 对话信息
const talkGroupArr = ref([])

const handleSendQuestion = async selectedText => {
  talkGroupArr.value.push({
    question: selectedText,
    answer: '等待响应',
  })
  let buffQestion = selectedText
  question.value = ''
  talkGroupArr.value[talkGroupArr.value.length - 1].answer = ''
  try {
    await getChat(buffQestion)
  } catch (_e) {
    const htmlStr = `<div class="error">糟糕出错了！请重试！</div>`
    talkGroupArr.value[talkGroupArr.value.length - 1].answer += htmlStr
  }
}

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

// 清空对话
const handleClearTalk = () => {
  talkGroupArr.value = []
}

defineExpose({ handleSendQuestion })
</script>

<style lang="scss" scoped>
.font-10 {
  // 恢复字体大小
  font-size: 10px;
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
@mixin talk-body {
  flex: 1;
  padding: $padding-xl;
  display: flex;
  flex-direction: column;
  gap: 50px;
  overflow-y: auto;
}
.right {
  max-width: 400px;
  max-height: 600px;
  width: 100%;
  height: calc(100vh - $header-height);
  display: flex;
  flex-direction: column;
  background-color: rgb(240, 244, 251);
  transition: all 0.5s ease;
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
  }
  .talk-none {
    @include talk-body();
  }
}

// 移动端暂时先不显示
@media screen and (max-width: 768px) {
  .right {
    display: none;
  }
}
</style>

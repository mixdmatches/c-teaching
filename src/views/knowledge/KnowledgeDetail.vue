<template>
  <HeaderCm></HeaderCm>
  <div class="content-box">
    <LeftSection @sendRef="handleSendRef"></LeftSection>
    <transition name="slide-fade">
      <LLMTalk ref="rightDom" v-if="isAi" @closeAi="handleCloseAi"></LLMTalk>
    </transition>
    <span v-show="!isAi" class="ai-help" @click="handleOpenAi">
      <el-icon><ChatDotRound /></el-icon>
    </span>
  </div>
</template>

<script setup>
import HeaderCm from '../../components/HeaderCm.vue'
import LLMTalk from '@/views/knowledge/components/LLMTalk'
import LeftSection from '@/views/knowledge/components/LeftSection'
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useUserStore } from '@/stores/index'

// 引入图标
import { marked } from 'marked'
import hljs from 'highlight.js'
// 引入高亮样式
import 'highlight.js/styles/monokai-sublime.css'
// 配置marked高亮
marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code).value
  },
})
// 定义是否显示ai
const isAi = ref(false)

// leftdom元素
const leftDom = ref()

// 获取user仓库
const userStore = useUserStore()

// 定义在线学习时间
const studyTime = ref(0)
let timer = null

// 在组件挂载后启动计时器
onMounted(() => {
  timer = setInterval(() => {
    studyTime.value++
  }, 1000)
})

// 在组件卸载前清除计时器
onUnmounted(() => {
  const studyTimeValue = parseInt(studyTime.value) // 确保 studyTime 是数字类型
  userStore.changeTotalTime(studyTimeValue)
  if (timer) {
    clearInterval(timer)
  }
})

// 获取子组件传过来的dom
const handleSendRef = left => {
  leftDom.value = left
}

// 关闭ai
const handleCloseAi = () => {
  isAi.value = false
  leftDom.value.style.transform = ''
  leftDom.value.style.transition = 'transform 0.5s ease'
  nextTick(() => {
    leftDom.value.style.transform = ''
    leftDom.value.style.transition = ''
  })
}

// 打开ai
const handleOpenAi = () => {
  isAi.value = true
}

// 监听 isAi 的变化
watch(isAi, () => {
  leftDom.value.style.transform = `translateX(-${210}px)`
})

// markdown文本
const markdownText = ref(
  '# Markdown 演示\n\n' +
    '```javascript\n' +
    'function test() {\n' +
    '  console.log("代码高亮演示");\n' +
    '}\n' +
    '```\n\n' +
    '## 标题演示\n' +
    '### 三级标题\n' +
    '#### 四级标题\n\n' +
    '## 列表样式\n' +
    '- 无序列表项1\n' +
    '- 无序列表项2\n' +
    '  - 嵌套列表项\n\n' +
    '1. 有序列表1\n' +
    '2. 有序列表2\n\n' +
    '## 代码块\n' +
    '行内代码 `console.log("Hello")`\n\n' +
    '```javascript\n' +
    'function demo() {\n' +
    '  // 代码块演示\n' +
    '  const arr = [1, 2, 3];\n' +
    '  return arr.map(x => x * 2);\n' +
    '}\n' +
    '```\n\n' +
    '## 强调文本\n' +
    '*斜体文本*  **加粗文本**  ~~删除线~~\n\n' +
    '## 链接与图片\n' +
    '[示例链接](https://example.com)\n\n' +
    '![占位图片](https://via.placeholder.com/150)\n\n' +
    '## 表格\n' +
    '| 姓名   | 年龄 | 职业      |\n' +
    '|--------|------|-----------|\n' +
    '| 张三   | 28   | 工程师    |\n' +
    '| 李四   | 32   | 设计师    |\n\n' +
    '## 引用块\n' +
    '> 这是引用文本\n' +
    '>> 嵌套引用文本\n'
)
</script>

<style scoped lang="scss">
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

@font-face {
  font-family: 'DingTalk'; // 自定义字体名称
  src: url('@/assets/fonts/DingTalk-JinBuTi.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
.content-box {
  position: relative;
  width: 100%;
  // 高度根据子盒子自适应
  height: auto;
  display: flex;
  justify-content: center;
  padding: 0 6 * $padding-xxl 0;
  gap: 10px;
  margin-top: calc($margin-xxl + $header-height);
  margin-bottom: $header-height;
  .ai-help {
    position: fixed;
    top: 110px;
    right: 50px;
    background-color: $primary-color;
    color: #fff;
    font-size: 2 * $font-size-xl;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    &::after {
      content: 'Ai助手';
      position: absolute;
      top: 110%;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 14px;
      opacity: 0;
      visibility: hidden;
      /* 确保文字横向显示 */
      writing-mode: horizontal-tb;
      white-space: nowrap; /* 防止文字换行 */
      transition:
        opacity 0.3s,
        visibility 0.3s;
    }

    &:hover::after {
      opacity: 1;
      visibility: visible;
    }
  }
  .right {
    transition: all 0.5s ease;
  }
}
</style>

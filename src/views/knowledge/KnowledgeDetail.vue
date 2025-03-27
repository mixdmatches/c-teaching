<template>
  <HeaderCm></HeaderCm>
  <div class="content-box">
    <LeftStudy></LeftStudy>
    <LeftSection @sendRef="handleSendRef"></LeftSection>
    <transition name="slide-fade">
      <LLMTalk ref="rightDom" @closeAi="handleCloseAi"></LLMTalk>
    </transition>
    <!-- <span v-show="!isAi" class="ai-help" @click="handleOpenAi">
      <el-icon><ChatDotRound /></el-icon>
    </span> -->
    <el-backtop :right="50" :bottom="100" />
  </div>
</template>

<script setup>
import HeaderCm from '../../components/HeaderCm.vue'
import LeftStudy from '@/views/knowledge/components/LeftStudy.vue'
import LLMTalk from '@/views/knowledge/components/LLMTalk'
import LeftSection from '@/views/knowledge/components/LeftSection'
import { ref } from 'vue'
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

// 获取子组件传过来的dom
const handleSendRef = left => {
  leftDom.value = left
}

// 关闭ai
const handleCloseAi = () => {
  isAi.value = false
}

// 打开ai
const handleOpenAi = () => {
  isAi.value = true
}
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
  justify-content: space-around;
  gap: 10px;
  padding: 0 $padding-xl;
  margin-top: $margin-xxl;
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
}
</style>

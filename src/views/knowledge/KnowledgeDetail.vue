<template>
  <HeaderCm></HeaderCm>
  <div class="content-box">
    <LeftStudy v-if="!isMobile"></LeftStudy>
    <LeftSection @send-question="callChildMethod"></LeftSection>
    <div class="aiTalk">
      <LLMTalk ref="llmTalkRef"></LLMTalk>
    </div>
    <el-backtop :right="50" :bottom="100" />
  </div>
</template>

<script setup>
import HeaderCm from '../../components/HeaderCm.vue'
import LeftStudy from '@/views/knowledge/components/LeftStudy.vue'
import LLMTalk from '@/views/knowledge/components/LLMTalk/index.vue'
import LeftSection from '@/views/knowledge/components/LeftSection'
import { ref, computed } from 'vue'
// 创建一个 ref 来引用子组件实例
const llmTalkRef = ref(null)
// 定义一个方法来调用子组件的暴露方法
const callChildMethod = selectText => {
  if (llmTalkRef.value) {
    llmTalkRef.value.handleSendQuestion(`解释：${selectText}`)
  }
}
// 检测是否为移动端
const isMobile = computed(() => window.innerWidth <= 768)
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
  .aiTalk {
    flex: 1;
  }
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

@media (max-width: 768px) {
  .content-box {
    flex-direction: column;
    padding: 0 $padding-s;
    margin-top: $margin-l;
  }

  .aiTalk {
    width: 100%;
  }

  .ai-help {
    right: 20px;
    font-size: 1.5 * $font-size-xl;
  }
}
</style>

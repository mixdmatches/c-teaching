<template>
  <HeaderCm></HeaderCm>
  <MainCm>
    <div class="ai-summary">
      <div class="top">
        <h5>AI智能总结</h5>
        <span class="icon" @click="handleCopy"
          ><el-icon size="20"><CopyDocument /></el-icon> 复制</span
        >
      </div>
      <div class="content">{{ summaryText }}</div>
    </div>
    <section v-html="markdownToHtml"></section>
    <footer>
      <span
        >关联知识：<el-button>循环</el-button><el-button>数组</el-button></span
      >
      <el-button type="primary">去测试</el-button>
    </footer>
  </MainCm>
</template>

<script setup>
import HeaderCm from '../../components/HeaderCm.vue'
import MainCm from '../../components/MainCm.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
// 获取路由参数
const route = useRoute()
const index = route.query.index
console.log(index, 'index')

const markdonwText = ref(
  '# Markdown 标题\n\n' +
    '这是一个 Markdown 示例。\n\n' +
    '## 二级标题\n\n' +
    '这是一个二级标题。\n\n' +
    '### 三级标题\n\n' +
    '这是一个三级标题。\n\n'
)
const markdownToHtml = ref(marked(markdonwText.value))
const summaryText = ref(
  `这是一篇关于 C 语言的超详细学习笔记，涵盖了 C 语言的众多基础知识和应用，包括入门介绍、数据类型、运算符号、控制结构（分支、循环）、函数、数组、字符串、多维数组等内容，还通过大量示例和综合练习进行了深入讲解。`
)
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(summaryText.value)
    ElMessage.success('复制成功')
  } catch (err) {
    ElMessage.error('复制失败，请手动选择文本复制')
  }
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'DingTalk'; // 自定义字体名称
  src: url('@/assets/fonts/DingTalk-JinBuTi.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
.ai-summary {
  width: 100%;
  height: 200px;
  background-color: #ffffff;
  border-radius: $border-radius-s;
  padding: $padding-xl;
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $margin-l;
    h5 {
      color: $primary-color;
      font-size: 1.6rem;
      font-family: DingTalk;
    }
    .icon {
      display: flex;
      font-size: $font-size-xl;
      align-items: center;
      gap: $margin-s;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        color: $primary-color;
      }
    }
  }
  .content {
    flex: 1;
    padding: $padding-m;
    color: $text-color;
    font-size: $font-size-xl;
    line-height: 1.5;
    border: 1px solid #ccc;
    border-radius: $border-radius-s;
    white-space: pre-wrap;
    overflow-y: auto;
  }
}
section {
  @import './reset-override.scss';
  :deep(*) {
    @extend *;
  }
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin: $margin-xl 0;
  padding: $padding-xl;
  border-radius: $border-radius-s;
}
footer {
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  border-radius: $border-radius-s;
  padding: 0 $padding-xl;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: $font-size-l;
  }
}
</style>

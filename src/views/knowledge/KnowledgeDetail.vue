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
    <section class="markdown-container" v-html="markdownToHtml"></section>
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
  '# Markdown 演示\n\n' +
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
.markdown-container {
  // width: 100%;
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

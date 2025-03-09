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
      <div class="content">{{ pointDetail.aiSummary }}</div>
    </div>
    <section class="markdown-container" v-html="markdownToHtml"></section>
    <footer>
      <span
        >关联知识：<el-tag
          style="margin-right: 5px"
          v-for="tag in pointDetail.relationName"
          :key="tag"
          >{{ tag }}</el-tag
        ></span
      >
      <el-button type="primary" @click="handleTest">去测试</el-button>
    </footer>
  </MainCm>
</template>

<script setup>
import HeaderCm from '../../components/HeaderCm.vue'
import MainCm from '../../components/MainCm.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/index'
import { ElMessage } from 'element-plus'
// 引入api
import { apiGetPointDetail } from '@/api/chapters'
import { useRoute, useRouter } from 'vue-router'
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
// 获取路由参数
const route = useRoute()
const router = useRouter()
// 从路由参数中解析出章节id和知识点id
const { pointId, sectionId } = route.query
console.log(pointId, sectionId)

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

// 定义知识点详情
const pointDetail = ref({
  context: '',
  aiSummary: '',
  relationName: [],
})

// 获取知识点详情教程
const getPointDetail = async () => {
  const res = await apiGetPointDetail({ pointId, sectionId })
  pointDetail.value = res.data
  console.log(pointDetail.value)
}
getPointDetail()

// markdown转html
const markdownToHtml = computed(() => {
  return marked.parse(pointDetail.value.context)
})

// 复制按钮回调
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(pointDetail.value.aiSummary)
    ElMessage.success('复制成功')
  } catch (err) {
    ElMessage.error('复制失败，请手动选择文本复制')
  }
}

// 去测试按钮回调
const handleTest = () => {
  router.push({ path: '/question', query: { pointId, sectionId } })
}

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

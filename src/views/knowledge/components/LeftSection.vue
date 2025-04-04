<template>
  <div class="left" ref="leftDom">
    <!-- ai总结 -->
    <div class="ai-summary">
      <div class="top">
        <h5>AI智能总结</h5>
        <span class="icon" @click="handleCopy"
          ><el-icon size="20"><CopyDocument /></el-icon>复制</span
        >
      </div>
      <div class="content">{{ pointDetail.summary }}</div>
      <!-- <div class="question">
        关联问题：
        <p
          v-for="item in relationQuestion"
          :key="item"
          href=""
          @click="handleSendQuestion(item)"
        >
          {{ item }}
        </p>
      </div>
      <div class="input">
        <el-input
          v-model="questionMessage"
          placeholder="基于该文章向ai提问"
        ></el-input>
        <el-button>发送</el-button>
      </div> -->
    </div>
    <!-- 教程内容 -->
    <el-tabs
      style="background: white"
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClickTab"
    >
      <el-tab-pane label="图文" name="text"
        ><section class="markdown-container" v-html="markdownToHtml"></section
      ></el-tab-pane>
      <el-tab-pane label="视频" name="video">
        <div class="play-video">
          <video class="video" controls src=""></video>
        </div>
      </el-tab-pane>
    </el-tabs>

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
    <el-button
      v-show="showSendButton"
      :style="{
        position: 'absolute',
        zIndex: '999',
        top: `${sendButtonPosition.y}px`,
        left: `${sendButtonPosition.x}px`,
      }"
      type="primary"
      @click="sendQuestion"
      >AI解释</el-button
    >
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
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
// leftDom实例
const leftDom = ref()
// 获取路由参数
const route = useRoute()
const router = useRouter()
// 从路由参数中解析出章节id和知识点id
const { pointId, sectionId } = route.query
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
  course: '',
  context: '',
  summary: '',
  relationName: [],
})

// 修复marke语法
function fixMarkdown(md) {
  // 1. 匹配代码块并临时存储
  const codeBlocks = []
  const mdWithCode = md.replace(/```([^]*?)```/g, (match, content) => {
    const placeholder = `[CODE_BLOCK_${codeBlocks.length}]`
    codeBlocks.push(content)
    return placeholder
  })

  // 2. 替换非代码块的 \\n 为实际换行符
  const fixedMd = mdWithCode.replace(/\\\\n/g, '\n')

  // 3. 恢复代码块并保留原转义符
  let finalMd = fixedMd
  codeBlocks.forEach((block, index) => {
    // 将代码块里的 \\n 转为 \n
    const processedBlock = block.replace(/\\\\n/g, '\n')
    finalMd = finalMd.replace(
      `[CODE_BLOCK_${index}]`,
      `\n\`\`\`\n${processedBlock}\n\`\`\`\n`
    )
  })

  return finalMd
}

// 获取知识点详情教程
const getPointDetail = async () => {
  const res = await apiGetPointDetail({
    pointId,
    sectionId,
    studentId: userStore.studentId,
  })
  pointDetail.value = res.data
  let arr = pointDetail.value.course.split('')
  arr.splice(0, 33)
  arr.splice(arr.length - 12, 12)
  pointDetail.value.course = fixMarkdown(arr.join(''))
}
getPointDetail()

// markdown转html
const markdownToHtml = computed(() => {
  return marked(pointDetail.value.course)
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
  router.push({ path: '/question', query: { knowPointId, sectionId } })
}

const activeName = ref('text')
const handleClickTab = (tab, event) => {
  activeName.value = tab.name
}
onMounted(() => {
  // 手动初始化高亮
  const codeBlocks = document.querySelectorAll('pre code')
  codeBlocks.forEach(block => {
    hljs.highlightElement(block)
  })
})

// 定义响应式变量来控制按钮的显示和隐藏')
const showSendButton = ref(false)
const sendButtonPosition = ref({ x: 0, y: 0 })
const selectedText = ref('')
// 定义选中文字事件处理函数
const handleSelectionChange = () => {
  const selection = window.getSelection()
  const text = selection.toString()
  if (text) {
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    sendButtonPosition.value = {
      x: rect.left + document.documentElement.scrollLeft,
      y: rect.top + document.documentElement.scrollTop - 130, // 按钮显示在选择文字上方
    }
    selectedText.value = text
    showSendButton.value = true
  } else {
    showSendButton.value = false
  }
}
// 定义可触发的事件
const emits = defineEmits(['send-question'])
// 发送ai处理函数
const sendQuestion = () => {
  emits('send-question', selectedText.value)
  showSendButton.value = false
  selectedText.value = ''
  window.getSelection().removeAllRanges()
}
// 组件挂载时添加事件监听器
onMounted(() => {
  document.addEventListener('selectionchange', handleSelectionChange)
})

// 组件卸载时移除事件监听器
onUnmounted(() => {
  document.removeEventListener('selectionchange', handleSelectionChange)
})
</script>

<style lang="scss" scoped>
// 引入 highlight.js 的样式
@import 'highlight.js/styles/vs2015.css';
.left {
  width: 100%;
  flex: 2;
  max-width: 740px;
  max-height: calc(100vh - $header-height - $margin-xxl);
  height: 100vh;
  scrollbar-color: transparent transparent;
  scrollbar-width: thin;
  overflow-y: auto;
  transition: all 0.5s ease;
  .ai-summary {
    width: 100%;
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
      height: 200px;
      padding: $padding-m;
      color: $text-color;
      font-size: $font-size-xl;
      line-height: 1.5;
      border: 1px solid #ccc;
      border-radius: $border-radius-s;
      white-space: pre-wrap;
      overflow-y: auto;
    }
    .question {
      display: flex;
      margin: $margin-l 0;
      font-size: $font-size-l;
      color: $text-color;
      p {
        color: $primary-color;
        margin-right: $margin-s;
        cursor: pointer;
      }
    }
    .input {
      display: flex;
    }
  }
  .play-video {
    width: 100%;
    height: 400px;
    background-color: #ffffff;
    padding: 0 $padding-xl;
    video {
      width: 100%;
    }
  }
  .demo-tabs > .el-tabs__content {
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
  .demo-tabs {
    width: 100%;
    margin: $margin-l 0;
    .el-tabs__nav-scroll {
      padding-left: 20px;
    }
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
}
</style>

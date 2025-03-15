<template>
  <div class="left" ref="leftDom">
    <div class="ai-summary">
      <div class="top">
        <h5>AI智能总结</h5>
        <span class="icon" @click="handleCopy"
          ><el-icon size="20"><CopyDocument /></el-icon>复制</span
        >
      </div>
      <div class="content">{{ pointDetail.aiSummary }}</div>
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
const emits = defineEmits(['sendRef'])
// 获取路由参数
const route = useRoute()
const router = useRouter()
// 从路由参数中解析出章节id和知识点id
const { pointId, sectionId } = route.query
console.log(pointId, sectionId)

// 定义是否显示ai
const isAi = ref(false)

// leftdom元素
const leftDom = ref(null)

// 传给父组件dom
onMounted(() => {
  emits('sendRef', leftDom.value)
})

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
  aiSummary: '',
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
  router.push({ path: '/question', query: { pointId, sectionId } })
}

// 监听 isAi 的变化
watch(isAi, () => {
  leftDom.value.style.transform = `translateX(-${210}px)`
})
</script>

<style lang="scss" scoped>
.left {
  width: 70%;
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

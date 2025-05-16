<template>
  <div ref="leftDom" class="left">
    <!-- ai总结 -->
    <div class="ai-summary">
      <div class="top">
        <h5>AI智能总结</h5>
        <span class="icon" @click="handleCopy(pointDetail.summary)"
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
      v-model="activeName"
      style="background: white"
      class="demo-tabs"
      @tab-click="handleClickTab"
    >
      <el-tab-pane label="图文" name="text"
        ><section
          v-if="pointDetail.course"
          ref="targetBox"
          v-parsemd="pointDetail.course"
          class="markdown-container"
        ></section>
        <el-empty v-else :image="empty" />
      </el-tab-pane>
      <el-tab-pane label="视频" name="video">
        <div class="play-video">
          <video class="video" controls :src="pointDetail.context"></video>
        </div>
      </el-tab-pane>
    </el-tabs>

    <footer>
      <span
        >关联知识：<el-tag
          v-for="tag in pointDetail.relationName"
          :key="tag"
          style="margin-right: 5px"
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/index'
// 引入hooks
import { useCopy } from '@/hooks/useCopy'
// 引入api
import { apiGetPointDetail } from '@/api/chapters'
import { useRoute, useRouter } from 'vue-router'
import empty from '@/assets/images/empty.png'

const { handleCopy } = useCopy()
// leftDom实例
const leftDom = ref()
// 获取路由参数
const route = useRoute()
const router = useRouter()
// 从路由参数中解析出章节id和知识点id
const { pointId, sectionId } = route.query
// 获取user仓库
const userStore = useUserStore()

// 定义知识点详情
const pointDetail = ref({
  course: '',
  context: '',
  summary: '',
  relationName: [],
})

// 获取知识点详情教程
const getPointDetail = async () => {
  const res = await apiGetPointDetail({
    pointId,
    sectionId,
    studentId: userStore.studentId,
  })
  pointDetail.value = res.data
}

// 去测试按钮回调
const handleTest = () => {
  router.push({ path: '/question', query: { pointId: pointId, sectionId } })
}

const activeName = ref('text')
const handleClickTab = tab => {
  activeName.value = tab.name
}

const targetBox = ref(null)

const showSendButton = ref(false)
const sendButtonPosition = ref({ x: 0, y: 0 })
const selectedText = ref('')

const handleSelectionChange = () => {
  const selection = window.getSelection()
  if (!selection.rangeCount) return

  const range = selection.getRangeAt(0)
  const container = range.commonAncestorContainer
  const boxElement = targetBox.value

  if (boxElement.contains(container) || boxElement === container) {
    const text = selection.toString()
    if (text) {
      const rect = range.getBoundingClientRect()
      sendButtonPosition.value = {
        x: rect.left + document.documentElement.scrollLeft,
        y: rect.top + document.documentElement.scrollTop - 130,
      }
      selectedText.value = text
      showSendButton.value = true
    } else {
      showSendButton.value = false
    }
  }
}

const emits = defineEmits(['send-question'])

const sendQuestion = () => {
  emits('send-question', `解释：${selectedText.value}`)
  showSendButton.value = false
  selectedText.value = ''
  window.getSelection().removeAllRanges()
}

const handleMouseEnter = () => {
  document.addEventListener('selectionchange', handleSelectionChange)
}

const handleMouseLeave = () => {
  document.removeEventListener('selectionchange', handleSelectionChange)
}

const handleAIExplain = code => {
  emits('send-question', '请解释以下代码' + code)
}

const handleAddCodeBlock = (targetBox, aiExplainFunc) => {
  if (!targetBox) return

  const codeBlocks = targetBox.querySelectorAll('pre code')

  codeBlocks.forEach(codeBlock => {
    let language = codeBlock.classList[1].split('-')[1]
    const preElement = codeBlock.parentElement
    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('code-actions')

    const copyButton = document.createElement('button')
    copyButton.classList.add('copy-button')
    copyButton.textContent = '复制代码'
    copyButton.addEventListener('click', () => {
      handleCopy(codeBlock.textContent)
    })

    const aiExplainButton = document.createElement('button')
    aiExplainButton.classList.add('explain-button')
    aiExplainButton.textContent = '代码解读'
    aiExplainButton.addEventListener('click', () => {
      aiExplainFunc(codeBlock.textContent)
    })

    const languageSpan = document.createElement('span')
    languageSpan.textContent = language
    languageSpan.classList.add('language')

    buttonContainer.appendChild(languageSpan)
    buttonContainer.appendChild(copyButton)
    buttonContainer.appendChild(aiExplainButton)
    preElement.insertBefore(buttonContainer, preElement.firstChild)
  })
}

onMounted(async () => {
  await getPointDetail()

  if (targetBox.value) {
    handleAddCodeBlock(targetBox.value, handleAIExplain)
    targetBox.value.addEventListener('mouseenter', handleMouseEnter)
    targetBox.value.addEventListener('mouseleave', handleMouseLeave)
  }
})

onUnmounted(() => {
  if (targetBox.value) {
    targetBox.value.removeEventListener('mouseenter', handleMouseEnter)
    targetBox.value.removeEventListener('mouseleave', handleMouseLeave)
  }
  document.removeEventListener('selectionchange', handleSelectionChange)
})
</script>

<style lang="scss" scoped>
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
    height: 450px;
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

@media (max-width: 768px) {
  .left {
    max-width: 100%;
    max-height: none;
  }

  .play-video {
    height: auto;
  }

  .video {
    height: auto;
  }
}
</style>

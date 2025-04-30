<template>
  <HeaderCm />
  <SubHeader title="测试中" exit-text="退出答题">
    <template #right> </template>
  </SubHeader>
  <main
    v-loading="isLoading"
    element-loading-text="加载中..."
    style="min-height: 200px"
  >
    <el-scrollbar v-if="!isLoading">
      <div class="questionBox">
        <QuestionItem
          v-for="(item, index) in questionList"
          :key="item.id"
          v-model="questionList[index].studentAnswer"
          :option="item"
        />
      </div>
    </el-scrollbar>
    <!-- 返回顶部 -->
    <el-backtop
      target=".el-scrollbar .el-scrollbar__wrap"
      :visibility-height="100"
    />
  </main>
  <footer>
    <div class="footerBox">
      <div class="left">
        <div class="viewDotBox">
          <ProblemViewDot
            v-for="(item, index) in questionList"
            :key="item.id"
            :value="questionList[index].studentAnswer"
          >
            {{ index + 1 }}
          </ProblemViewDot>
        </div>
        <div class="tipBox">
          <div>
            <ProblemViewDot :value="1"></ProblemViewDot>
            <span>已做</span>
          </div>
          <div>
            <ProblemViewDot></ProblemViewDot>
            <span>未完成</span>
          </div>
        </div>
      </div>
      <LButton @click="submitTest">提交</LButton>
    </div>
  </footer>
</template>

<script setup>
import SubHeader from '@/components/SubHeader.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import QuestionItem from '@/views/question/components/QuestionItem.vue'
import LButton from '@/components/LButton.vue'
import { formatTime } from '@/utils/dateUtils.js'
import HeaderCm from '@/components/HeaderCm.vue'
import { useRoute, useRouter } from 'vue-router'
import ProblemViewDot from '@/components/problemViewDot.vue'
import { postSameQs } from '@/api/question.js'
import { useUserStore } from '@/stores/index.js'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 定义状态变量
const status = ref(false)

// 题目列表
const questionList = ref([])
// 加载状态
const isLoading = ref(true)

// 做题总时间
const totalTime = ref(0)
// 时间相关逻辑
const time = ref(0)
const _showTimeString = computed(() => formatTime(time.value))
const timeInterval = ref()

// 获取题目列表
const handleGetQuestionList = async () => {
  try {
    // 显示加载状态
    isLoading.value = true

    if (route.query.topicId) {
      const list = await postSameQs(route.query.topicId)
      questionList.value = list.data
      isLoading.value = false
    }
  } finally {
    // 隐藏加载状态
    isLoading.value = false
  }
}

// 开始计时
const startTiming = () => {
  if (!timeInterval.value) {
    timeInterval.value = setInterval(() => {
      totalTime.value += 1
    }, 1000)
  }
}

onMounted(async () => {
  // 获取题目数据
  await handleGetQuestionList()

  // 数据加载完成后开始计时
  if (!isLoading.value) {
    startTiming()
  }
})

onUnmounted(() => {
  clearInterval(timeInterval.value)
})

// 提交测试
const submitTest = async () => {
  // 更新状态为 true
  status.value = true
  userStore.changeCeshi()

  // 将状态传递到其他页面
  router.push({
    path: '/samequestion',
    query: {
      showMistakesInfos: JSON.stringify(
        questionList.value.map((item, index) => {
          return {
            topicId: index + 1, // 固定生成 topicId，从 1 开始递增
            studentAnswer: item.studentAnswer,
          }
        }),
      ),
    },
  })
}
</script>

<style lang="scss" scoped>
main {
  width: $main-width;
  height: calc(100vh - 228px);
  margin: 0 auto;

  .questionBox {
    display: flex;
    flex-direction: column;
    gap: $padding-xxl;
    padding-top: $padding-xxl;
  }
}

footer {
  background-color: $base-bg-color;
  padding: $padding-xxl 0;
  height: 128px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  .footerBox {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    width: $main-width;
    margin: 0 auto;

    .left {
      display: flex;
      align-items: center;

      .viewDotBox {
        min-width: 200px;
        display: flex;
        gap: $padding-s;
      }

      .tipBox {
        display: flex;
        align-items: center;
        gap: $padding-xl;
        margin-left: 20px;

        & > div {
          display: flex;
          align-items: center;
          gap: $padding-s;
        }
      }
    }
  }
}
</style>

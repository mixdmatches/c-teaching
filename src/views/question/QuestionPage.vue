<template>
  <SubHeader title="测试中" exit-text="退出答题">
    <template #right>
      {{ showTimeString }}
    </template>
  </SubHeader>
  <main>
    <el-scrollbar>
      <div class="questionBox">
        <QuestionItem v-for="(item, index) in questionList" v-model="questionList[index].answer" :key="item.id"
          :option="item" />
      </div>
    </el-scrollbar>
    <!-- 返回顶部 -->
    <el-backtop target=".el-scrollbar .el-scrollbar__wrap" :visibility-height="100" />
  </main>
  <footer>
    <div class="footerBox">
      <div class="left">
        <div class="viewDotBox">
          <ProblemViewDot v-for="(item, index) in questionList" :value="questionList[index].answer">
            {{index+1}}
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
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import QuestionItem from '@/views/question/components/QuestionItem.vue'
import LButton from '@/components/LButton.vue'
import { formatTime } from '@/utils/dateUtils.js'
import { useRoute, useRouter } from 'vue-router'
import ProblemViewDot from '@/components/problemViewDot.vue'
import { getQuestionByKnowledge, getQuestionBySectionId } from '@/api/question.js'
import { useUserStore } from '@/stores/index.js'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 定义状态变量
const status = ref(false)

// 题目列表
const questionList = reactive([])
const handleGetQuestionList = async () => {
  if (route.query.sectionId && route.query.pointId) {
    questionList.length = 0
    const list = (await getQuestionByKnowledge({ sectionId: route.query.sectionId, pointId: route.query.pointId, studentId: userStore.getUserId() })).map((item) => {
      return {
        ...item,
        type: 'radio'
      }
    })
    questionList.push(...list)
    return
  }
  if (route.query.sectionId) {
    questionList.length = 0
    const list = (await getQuestionBySectionId({ sectionId: route.query.sectionId })).map((item) => {
      return {
        ...item,
        type: 'radio'
      }
    })
    questionList.push(...list)
  }
}

// 时间相关逻辑
const time = ref(0)
const showTimeString = computed(() => formatTime(time.value))
const timeInterval = ref()
const startTiming = () => {
  timeInterval.value = setInterval(() => {
    time.value += 1
  }, 1000)
}
onMounted(() => {
  handleGetQuestionList()
  startTiming()
})
onUnmounted(() => {
  clearInterval(timeInterval.value)
})

// 提交测试
const submitTest = () => {
  // 检查是否有未完成的题目

  // 更新状态为 true
  status.value = true
  userStore.changeCeshi()

  // 将状态传递到其他页面
  router.push({
    path: '/result',
    query: {
      pointId: route.query.pointId,
      sectionId: route.query.sectionId,
      time: time.value,
      results: JSON.stringify(questionList.map((item) => {
        return {
          id: item.id,
          studentAnswer: item.answer
        }
      }))
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

        &>div {
          display: flex;
          align-items: center;
          gap: $padding-s;
        }
      }
    }
  }
}
</style>
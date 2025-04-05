<template>
  <HeaderCm />
  <SubHeader title="测试中" exit-text="退出答题">
    <template #right>
      {{ showTimeString }}
    </template>
  </SubHeader>
  <main>
    <div class="questionBox">
      <QuestionItem
        v-if="questionList.length > 0"
        v-model="questionList[currentIndex].answer"
        :key="questionList[currentIndex].id"
        :option="questionList[currentIndex]"
        :correctAnswer="questionList[currentIndex].correctAnswer"
        :explanation="questionList[currentIndex].analysis"
        :spentTime="questionList[currentIndex].timeSpent"
        :resetTimer="resetTimer"
        :isLastQuestion="isLastQuestion"
      />
    </div>
  </main>
  <footer>
    <div class="footerBox">
      <div class="left">
        <div class="viewDotBox">
          <ProblemViewDot
            v-for="(item, index) in questionList"
            :key="item.id"
            :value="questionList[index].answer"
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
      <!-- 上一题和下一题切换 -->
      <div class="question-nav">
        <el-button class="btn" v-if="currentIndex > 0" @click="prevQuestion">上一题</el-button>
        <el-button class="btn" @click="nextQuestion">下一题</el-button>
      </div>
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
import {
  getQuestionByKnowledge,
  getQuestionBySectionId,
} from '@/api/question.js'
import { useUserStore } from '@/stores/index.js'
import HeaderCm from '../../components/HeaderCm.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 定义状态变量
const status = ref(false)

// 题目列表
const questionList = reactive([
  {
    id: 1,
    no: 1,
    type: 'radio',
    title: 'C语言的输出语句是什么',
    options: [
      { id: 'A', text: 'printf' },
      { id: 'B', text: 'print' },
      { id: 'C', text: 'println' },
      { id: 'D', text: 'write' }
    ],
    knowPointName: 'C语言',
    answer: '',
    correctAnswer: 'A',
    // 修正字段名拼写
    analysis: '在C语言中，printf是一个常用的输出语句，用于将数据输出到标准输出设备（通常是屏幕）。',
    difficulty:3,
    hierarchy:2,
    timeSpent: 0,
    isCorrect: false
  },
  {
    id: 2,
    no: 2,
    type: 'radio',
    title: 'C语言的跳转语句是什么',
    options: [
      { id: 'A', text: 'break' },
      { id: 'B', text: 'continue' },
      { id: 'C', text: 'return' },
      { id: 'D', text: 'goto' }
    ],
    knowPointName: 'C语言',
    answer: '',
    correctAnswer: 'C',
    // 修正字段名拼写
    analysis: '在C语言中，return是一个常用的跳转语句，用于从函数中返回一个值，并终止函数的执行。',
    difficulty:3,
    hierarchy:2,
    timeSpent: 0,
    isCorrect: true
  },
  {
    id: 3,
    no: 3,
    type: 'radio',
    title: 'C语言的输出语句是什么',
    options: [
      { id: 'A', text: 'printf' },
      { id: 'B', text: 'print' },
      { id: 'C', text: 'println' },
      { id: 'D', text: 'write' }
    ],
    knowPointName: 'C语言',
    answer: '',
    correctAnswer: 'A',
    // 修正字段名拼写
    analysis: '在C语言中，printf是一个常用的输出语句，用于将数据输出到标准输出设备（通常是屏幕）。',
    difficulty:3,
    hierarchy:2,
    timeSpent: 0,
    isCorrect: false
  },
])
// 当前题目索引
const currentIndex = ref(0)

// 时间相关逻辑
const time = ref(0)
const showTimeString = computed(() => formatTime(time.value))
const timeInterval = ref()


const startTiming = () => {
  time.value = 0
  clearInterval(timeInterval.value)
  timeInterval.value = setInterval(() => {
    time.value += 1
  }, 1000)
}

// 停止计时函数
const stopTiming = () => {
  clearInterval(timeInterval.value)
}
// 重置计时器方法
const resetTimer = () => {
  stopTiming()
  const currentTime = time.value
  questionList[currentIndex.value].timeSpent = currentTime
  // startTiming()
  console.log(currentTime);
  
}
defineExpose({
  resetTimer,
})

onMounted(() => {
  // handleGetQuestionList()
  startTiming()
})

onUnmounted(() => {
  clearInterval(timeInterval.value)
})

// 上一题
const prevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

// 下一题
const nextQuestion = () => {
  if (currentIndex.value < questionList.length - 1) {
     currentIndex.value++
     stopTiming()
     startTiming()
  }
}
//判断是否是最后一题
const isLastQuestion = computed(() => {
  return currentIndex.value === questionList.length - 1
})

// 提交测试
// const submitTest = () => {
//   // 停止计时
//   stopTiming()
//   // 显示答题结果
//   showResults.value = true
//   // 更新每个题目的 isCorrect 字段
//   questionList.forEach(item => {
//     item.isCorrect = item.answer === item.correctAnswer
//   })
//   // 更新状态为 true
//   status.value = true
//   userStore.changeCeshi()

//   // 将状态传递到其他页面
//   // router.push({
//   //   path: '/result',
//   //   query: {
//   //     pointId: route.query.pointId,
//   //     sectionId: route.query.sectionId,
//   //     time: time.value,
//   //     results: JSON.stringify(
//   //       questionList.map(item => {
//   //         return {
//   //           id: item.id,
//   //           studentAnswer: item.answer,
//   //         }
//   //       })
//   //     ),
//   //   },
//   // })
// }
</script>

<style lang="scss" scoped>
main {
  position: relative;
  width: 1200px;
  // 修改：添加 margin-bottom 为底部 footer 预留空间
  height: 600px; 
  margin: 0 auto;
  // 修改：添加 margin-bottom 为底部 footer 预留空间
  margin-bottom: 128px; 

  .questionBox {
    width: 400px;
    height: 500px;
    display: flex;
    flex-direction: column;
    gap: $padding-xxl;
    padding-top: $padding-xxl;
  }
}
.question-nav {
  position: absolute;
  bottom: 45px;
  right: 45px;
  margin-top: 20px;
  text-align: center;
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
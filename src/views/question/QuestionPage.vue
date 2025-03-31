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
        />
      </div>
      <!-- 上一题和下一题切换 -->
     <div class="question-nav">
      <el-button class="btn" v-if="currentIndex >= 0" @click="prevQuestion">上一题</el-button>
      <el-button class="btn" v-if="currentIndex < questionList.length" @click="nextQuestion">下一题</el-button>
     </div>
  </main>
  <!-- <footer>
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
      <LButton @click="submitTest">提交</LButton>
    </div>
  </footer> -->
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
// const questionList = relactve([])
// 题目列表
const questionList = reactive([
  {
    id: 1,
    no: 1,
    type: 'radio',
    title: 'C语言的输出语句是什么',
    options: [
      {id: 'A',text: 'printf'},
      {id: 'B',text: 'print'},
      {id: 'C',text: 'println'},
      {id: 'D',text: 'write'}
    ],
    knowPointName: 'C语言',
    answer: '',
    correctAnswer: 'A',
    anysis: '在C语言中，printf是一个常用的输出语句，用于将数据输出到标准输出设备（通常是屏幕）。'
  },
  {
    id: 2,
    no: 2,
    type: 'radio',
    title: 'C语言的跳转语句是什么',
    options: [
      {id: 'A',text: 'break'},
      {id: 'B',text: 'continue'},
      {id: 'C',text: 'return'},
      {id: 'D',text: 'goto'}
    ],
    knowPointName: 'C语言',
    answer: '',
    correctAnswer: 'C',
    anysis: '在C语言中，return是一个常用的跳转语句，用于从函数中返回一个值，并终止函数的执行。'
  }
])
// const questionList = reactive([])
// 当前题目索引
const currentIndex = ref(0);
// const handleGetQuestionList = async () => {
//   if (route.query.sectionId && route.query.pointId) {
//     questionList.length = 0
//     const list = (
//       await getQuestionByKnowledge({
//         sectionId: route.query.sectionId,
//         pointId: route.query.pointId,
//         studentId: userStore.getUserId(),
//       })
//     ).map((item, index) => {
//       return {
//         ...item,
//         no: index + 1,
//         type: 'radio',
//       }
//     })
//     questionList.push(...list)
//     return
//   }
//   if (route.query.sectionId) {
//     questionList.length = 0
//     const list = (
//       await getQuestionBySectionId({ sectionId: route.query.sectionId })
//     ).map((item, index) => {
//       return {
//         ...item,
//         no: index + 1,
//         type: 'radio',
//       }
//     })
//     questionList.push(...list)
//   }
// }

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
  // handleGetQuestionList()
  startTiming()
})

// const fetchQuestions = async pointId => {
//   try {
//     const data = await getQuestionListByPointId(pointId)
//     questionList.splice(
//       0,
//       questionList.length,
//       ...data.map((item, index) => ({
//         no: index + 1,
//         type: item.type || 'radio',
//         difficulty: item.difficulty || 3,
//         emphasis: item.emphasis || 4,
//         tags: item.tags || [],
//         title: item.title || '题目描述',
//         options: item.options || [
//           { id: 'A', text: '选项一' },
//           { id: 'B', text: '选项二' },
//           { id: 'C', text: '选项三' },
//           { id: 'D', text: '选项四' },
//         ],
//         selectId: '',
//       }))
//     )
//   } catch (error) {
//     console.error('请求错误:', error.message) // 添加详细的错误信息打印
//     console.error('请求详情:', error.config) // 打印请求的具体配置
//   }
// }

// onMounted(() => {
//   const pointId = 3
//   fetchQuestions(pointId)
// })
onUnmounted(() => {
  clearInterval(timeInterval.value)
})
// 上一题
const prevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};
// 下一题
const nextQuestion = () => {
  if (currentIndex.value < questionList.length - 1) {
    currentIndex.value++;
  }
}

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
      results: JSON.stringify(
        questionList.map(item => {
          return {
            id: item.id,
            studentAnswer: item.answer,
          }
        })
      ),
    },
  })
}
</script>

<style lang="scss" scoped>
main {
  position: relative;
  width: 1200px;
  // 修改：添加 margin-bottom 为底部 footer 预留空间
  height: 1200px; 
  margin: 0 auto;
  // 修改：添加 margin-bottom 为底部 footer 预留空间
  margin-bottom: 128px; 

  .questionBox {
    width: 1000px;
    height:500px;
    display: flex;
    flex-direction: column;
    gap: $padding-xxl;
    padding-top: $padding-xxl;
  }
}
.question-nav {
  position: absolute;
  top: 400px;
  right: 50px;
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
